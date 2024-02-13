import axios from "axios";
import { NavigateFunction } from "react-router-dom";
export const getAuth = async (navigate:NavigateFunction,successPath?:string) => {
  try {
    const response = await axios.get("http://localhost:3006/auth-status", {
      withCredentials: true, //setting for getting cookie
    });
    if (!response.data.success) {//if do not be login, back to login page
      navigate("/login");
    }else if(successPath){ // if logined, move to other page if you want to.
      navigate(successPath);
    }
  } catch (error) {
    console.error("Error occurred during authentication:", error);
  }
};
