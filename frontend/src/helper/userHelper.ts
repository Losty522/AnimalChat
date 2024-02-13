import axios from "axios";

export const getLoginUserData = async () => {
  try {
    const response = await axios.get("http://localhost:3006/users/cookie", {
      withCredentials: true, //setting for getting cookie
    });
    if (response.data) {
      return response.data;
    }else{
      return undefined
    }      
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
