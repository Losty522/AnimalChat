import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { RoomArrType, messageType } from "../../type";
import { createMessage, getRoomMessageData } from "../../helper/messageHelper";
import CharField from "./CharField";

type Props = {
  username: string;
  userId: string;
  room: string;
  setRoom: (room: string) => void;
  icon: string;
  allUsers: Record<string, RoomArrType[]>;
  roomName: { [key: string]: string };
};

const ChatRoom = (props: Props) => {
  const [message, setMessage] = useState("");
  const [recivedMessage, setRecivedMessage] = useState<messageType[]>([]);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  const formatUnixTimestamp = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    setMessage("");
    const sendMessageObj: messageType = {
      msg: message,
      user: props.username,
      userId: props.userId,
      room: props.room,
      unixTimestamp: unixTimestamp,
    };
    await createMessage(sendMessageObj);
    socket.emit("send_message", sendMessageObj); //save latest message as well
  };

  const leaveRoom = async (currentRoom: string) => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);

    const sendMessageObj: messageType = {
      msg: `${props.username} has left the ${currentRoom}`,
      user: "System",
      userId: "",
      room: currentRoom,
      unixTimestamp: unixTimestamp,
    };
    const leaveObject = { ...sendMessageObj, leftUserId: props.userId };

    await createMessage(sendMessageObj); //save message to database
    socket.emit("leave room", leaveObject); //send message to eveybody by System
    props.setRoom("");
  };

  useEffect(() => {
    const handleReceivedMessage = async () => {
      //setRecivedMessage((previousMessages) => [...previousMessages, data]);
      const roomMessage = await getRoomMessageData(props.room);
      setRecivedMessage(roomMessage);
    };
    socket.on("send_message", handleReceivedMessage);

    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }

    return () => {
      socket.off("send_message", handleReceivedMessage);
    };
  }, [recivedMessage]);

  return (
    // <div className=" w-11/12 mx-auto">
    <div className="w-full mx-auto">
      <div
        className="flex justify-center items-center rounded-2xl bg-green-300 shadow-2xl w-11/12 sm:w-80 h-14 mx-auto mt-3 mb-3 "
        style={{
          backgroundImage: `url('/922141.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="text-xl">{props.roomName[props.room]}</div>
        <button
          className="bg-red-300 border border-black rounded-md ml-10 p-1 hover:bg-red-400"
          onClick={() => {
            leaveRoom(props.room);
          }}
        >
          Leave
        </button>
      </div>
      <div className="mx-auto">
        <CharField
          icon={props.icon}
          room={props.room}
          userId={props.userId}
          allUsers={props.allUsers}
        />
        <form onSubmit={sendMessage} className="flex my-5 justify-center">
          <input
            className="border border-black rounded p-1 w-6/12"
            placeholder="Message... max60"
            value={message}
            max={10}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setMessage(e.target.value);
              }
            }}
          />
          <button
            className="bg-blue-300 border border-black rounded-md ml-1 px-1  hover:bg-blue-400"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
      <div className="w-11/12 mx-auto border border-black bg-slate-300 text-center">
        Chat Log
      </div>
      <div
        ref={chatLogRef}
        className="h-52 w-11/12 mx-auto mb-3 border border-black  bg-slate-200 rounded overflow-y-auto"
      >
        {recivedMessage?.map((data, index) => (
          <div key={index} className="mx-auto my-1 ">
            {data.userId ? (
              <p className={"border-b border-gray-400 pl-3 text-sm"}>
                {data.user} {`<${data.userId}>`}(
                {formatUnixTimestamp(data.unixTimestamp)}): {data.msg}
              </p>
            ) : (
              <p
                className={"border-b border-gray-400 pl-3 text-sm text-red-500"}
              >
                {data.user} ({formatUnixTimestamp(data.unixTimestamp)}):{" "}
                {data.msg}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
