const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Get all users for callback
const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by id
const getUserByCookie = async (req, res) => {
  const userId = req.cookies.userCookie;
  console.log("cookiee::" + req.cookies.userCookie);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findUserByEmail = (userEmail) => {
  return User.findOne({ email: userEmail });
};

//add new user
const createUser = async (req, res) => {
  try {
    //check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "user alredy exists" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
          const newUser = new User({
            email: req.body.email,
            password: hash,
            username: req.body.username,
            icon: req.body.icon,
          });
          const addedUser = await newUser.save();
          res.json(addedUser);
        } else {
          console.error("Error creating:" + err);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// Update user by id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, icon } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    if (username) user.username = username;
    if (icon) user.icon = icon;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllusers,
  createUser,
  findUserByEmail,
  updateUser,
  getUserByCookie,
};
