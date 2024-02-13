import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get("http://localhost:3006/logout", {
          withCredentials: true,
        });
        if (response.data.logout) {
          // successful
          console.log("Login successful");
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    logout();
  }, []);
  return "";
};

export default Logout;
