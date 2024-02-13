const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const secretKey = process.env.SECRET_KEY; // Secret Key
require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;
// Import routes
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userController = require("./controllers/userController");

// Middleware to parseJSON
app.use(express.json());
// Parse form submission
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, //setting for getting cookie
  })
);
app.use(cookieParser(secretKey)); // Parse cookies object

// Connect to MongoDB Atlas
mongoose
  .connect(url)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Connection error: ", err));

// Routes middleware
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    metthods: ["GET", "POST"],
  },
});

// get authentication
app.get("/auth-status", (req, res) => {
  if (req.cookies && req.cookies.userCookie) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Route to login post request
app.post("/login", async (req, res) => {
  if (req.cookies && req.cookies.userCookie) {
    //res.redirect("/");
  } else {
    const { email, password } = req.body;
    const user = await userController.findUserByEmail(email);
    if (!user?.email) {
      console.log("not found");
      return res.json({ message: "User not found" });
    } else {
      // Load hash from your password.
      bcrypt.compare(password, user?.password, function (err, result) {
        if (result) {
          // Logged in successfully
          res.cookie("userCookie", user._id, {
            httpOnly: true,
            maxAge: 60000 * 24 * 60,
          }); // 60 seconds
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      });
    }
  }
});

// Route to log out
app.get("/logout", (req, res) => {
  res.clearCookie("userCookie");
  res.json({ logout: true });
});

const roomUsers = {}; //all users data
let timerId = {};

io.on("connection", (socket) => {
  console.log("User connected :" + socket.id);

  socket.on("fetch_all_users", () => {
    fetchData(socket); // get all  users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Loop through each room and filter out the disconnected user
    Object.keys(roomUsers).forEach((room) => {
      roomUsers[room] = roomUsers[room]?.filter(
        (user) => user.socketId !== socket.id
      );
    });
    updateRoomUsers();
  });

  // Join room
  socket.on("join room", (data) => {
    socket.join(data.room);
    console.log(`${data.user} joined ${data.room}`);
    socket.username = data.user;
    const room = data.room;
    //if its empty, create a empty array
    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }

    //roomUsers[room].push({ id: socket.id, username: data.user });
    //save user data who joined the room
    roomUsers[room].push({
      id: data.joinedUserId,
      username: data.joinedUserName,
      icon: data.joinedUserIcon,
      position: data.joinedUserPosition,
      imageWay: data.joinedImageWay,
      latestMsg: data.joinedUserMsg,
      socketId: socket.id,
    });
    updateRoomUsers(); //update all user data

    // Send Sys message to all clients in room
    io.to(data.room).emit("send_message", {
      msg: data.msg,
      user: data.user,
      room: data.room,
      userId: data.user.id,
    });
  });

  // Leave room
  socket.on("leave room", (data) => {
    const room = data.room;
    socket.leave(room);
    console.log(`${socket.username} has left ${room}`);

    roomUsers[room] = roomUsers[room]?.filter(
      (user) => user.id !== data.leftUserId
    ); //remove left user
    updateRoomUsers(); //update all user data

    // Send message to all clients in room
    io.to(room).emit("send_message", {
      msg: data.msg,
      user: data.user,
      room: data.room,
      userId: data.user.id,
      unixTimestamp: data.unixTimestamp,
    });
  });

  socket.on("send_message", (data) => {
    //when any users send a message, update all users object to Users in the room
    const index = roomUsers[data.room]?.findIndex(
      (user) => user.id === data.userId
    );
    if (index !== -1) {
      roomUsers[data.room][index].latestMsg = data.msg;
      io.to(data.room).emit("allUsers", { allUser: roomUsers });

      //reset timer
      if (timerId[data.userId]) {
        clearTimeout(timerId[data.userId]);
      }

      timerId[data.userId] = setTimeout(() => {
        roomUsers[data.room][index].latestMsg = "";
        io.to(data.room).emit("allUsers", { allUser: roomUsers });
        delete timerId[data.userId];
      }, 5000);
    }
    //just emit then update all messages in front end
    io.to(data.room).emit("send_message");
  });

  socket.on("icon_move", (data) => {
    if (data.index !== -1) {
      roomUsers[data.room][data.index].position.x = data.x;
      roomUsers[data.room][data.index].position.y = data.y;
      roomUsers[data.room][data.index].imageWay = data.imageWay;
      io.to(data.room).emit("allUsers", { allUser: roomUsers });
    }
  });
});

function updateRoomUsers() {
  //all clients
  io.emit("allUsers", { allUser: roomUsers });
}

function fetchData(socket) {
  //specific client
  socket.emit("allUsers", { allUser: roomUsers });
}

const port = 3006;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
