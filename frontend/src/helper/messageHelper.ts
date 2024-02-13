import axios from "axios";
import { messageType } from "../type";

export const getRoomMessageData = async (room:string) => {
  try {
    const response = await axios.get(`http://localhost:3006/messages/${room}`, {
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

export const createMessage = async (messageObj:messageType) => {
  try {
    const response = await axios.post(`http://localhost:3006/messages`,{
      msg: messageObj.msg,
      user: messageObj.user,
      userId: messageObj.userId,
      unixTimestamp:messageObj.unixTimestamp,
      room: messageObj.room,
    }, {
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