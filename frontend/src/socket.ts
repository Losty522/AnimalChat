import { io } from "socket.io-client";

const URL = "http://localhost:3006";
export const socket = io(URL);
