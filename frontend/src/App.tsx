import { useState, useEffect } from "react";
import { socket } from "./socket";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AllUsersType, RoomArrType } from "./type";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import UserData from "./components/UserData";
export default function App() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [allUsers, setAllUsers] = useState<Record<string, RoomArrType[]>>({});
  const [emptyMes, setEmptyMes] = useState("");

  useEffect(() => {
    const fetchData = () => {
      // get all users function for new accsess users
      socket.emit("fetch_all_users");
    };

    const handleAllusers = (data: { allUser: AllUsersType }) => {
      console.log(data.allUser);
      setAllUsers((prev) => ({ ...prev, ...data.allUser }));
      setEmptyMes("Empty Room");
    };

    socket.connect(); //default settings is automatically connected

    socket.on("connect", () => {
      console.log("connection");
      fetchData();
    });

    socket.on("allUsers", handleAllusers); //handle all users

    // disconnect event, when browser is closed
    socket.on("disconnect", () => {
      //console.log("Disconnected from server");
    });

    return () => {
      //clean up
      socket.off("allUsers", handleAllusers); //disconnect all users
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home allUsers={allUsers} emptyMes={emptyMes} />}
        />
        <Route
          path="/login"
          element={
            <Login
              isLoginSuccess={isLoginSuccess}
              setIsLoginSuccess={setIsLoginSuccess}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup setIsLoginSuccess={setIsLoginSuccess} />}
        />
        <Route path="/user" element={<UserData />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
