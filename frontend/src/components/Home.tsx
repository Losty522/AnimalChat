import { useEffect, useState } from "react";
import ChatRoom from "./chatRoom/ChatRoom";
import { socket } from "../socket";
import { RoomArrType, messageType } from "../type";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../auth/auth";
import Header from "./Header";
import { getLoginUserData } from "../helper/userHelper";
import { createMessage } from "../helper/messageHelper";

type Props = {
  allUsers: Record<string, RoomArrType[]>;
  emptyMes: string;
};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [icon, setIcon] = useState("");
  const [roomName, setRoomName] = useState({
    Room1: "Forest",
    Room2: "Pond",
    Room3: "Beach",
  });

  useEffect(() => {
    //check authentication
    getAuth(navigate);
    //get user data from helper fucction
    const fetchData = async () => {
      const userData = await getLoginUserData();
      if (userData?.username) {
        setUsername(userData?.username);
        setUserId(userData?._id);
        setIcon(userData?.icon);
      } else {
        setUsername("");
        setUserId("");
        setIcon("");
      }
    };
    fetchData();
  }, []);

  const changeRoom = async (roomName: string) => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    setRoom(roomName);
    const sendSystemMessageObj: messageType = {
      msg: `${username} has joined the ${roomName}`,
      user: "System",
      userId: "",
      room: roomName,
      unixTimestamp: unixTimestamp,
    };
    const systemAndUserObject = {
      //send this object to the backend
      ...sendSystemMessageObj,
      joinedUserName: username,
      joinedUserId: userId,
      joinedUserIcon: icon,
      joinedUserPosition: { x: 150, y: 120 }, //defalut position
      joinedImageWay: -1, //defalut image way
      joinedUserMsg: "", //defalut msg
      joinedTimerId: 0, //defalut timerId
    };

    await createMessage(sendSystemMessageObj); //save System message into database
    socket.emit("join room", systemAndUserObject); //pass System message obj and user data who joined the room.
  };

  return (
    <div className="w-full overflow-y-auto">
      {room == "" ? (
        <>
          <Header />
          <div className="flex flex-col items-center w-11/12 mx-auto">
            <div
              className="w-11/12 mt-10 mb-10 p-5 rounded-3xl overflow-hidden"
              style={{
                backgroundImage: `url('/1403443.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="flex justify-center">
                <div className=" text-4xl text-center ">
                  WELCOME, {username}
                </div>
                <img src={icon} alt="" className="h-12 w-12 object-contain" />
              </div>
              <div className="text-4xl text-center">TO ANIMAL CHAT</div>
              <div className="text-center mt-3 text-lg">
                You can select a room
              </div>
            </div>

            <div className="w-11/12 mt-5 mb-5  bg-slate-200 rounded shadow-2xl">
              <div className="text-center  mt-2 mx-auto w-11/12 border-b border-gray-400">
                Connecting Users
              </div>

              <div className=" bg-green-200 w-11/12 h-8 mt-2 mx-auto rounded overflow-hidden">
                <div className="flex justify-between h-8 w-full items-center text-center">
                  <div className="flex-grow pl-14 ">{roomName.Room1}</div>
                  <button
                    className="bg-blue-500 border border-blue-400 text-white rounded-md px-2 mr-2 h-6  hover:bg-blue-400"
                    onClick={() => {
                      changeRoom("Room1");
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
              <div className=" bg-green-100 mb-5 rounded pb-1 w-11/12 mx-auto overflow-y-auto shadow-2xl">
                {props.allUsers["Room1"]?.length ? (
                  props.allUsers["Room1"]?.map((data, index) => (
                    <div
                      key={index}
                      className="flex mx-3  border-b border-gray-300"
                    >
                      <img
                        className=" h-5 w-5 object-contain"
                        src={data.icon}
                        alt=""
                      />
                      <div>
                        {data.username} ({data.id})
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mx-3 text-red-400">{props.emptyMes}</div>
                )}
              </div>

              <div className=" bg-blue-200 w-11/12 h-8 mt-2 mx-auto rounded overflow-hidden">
                <div className="flex justify-between h-8 w-full items-center text-center">
                  <div className="flex-grow pl-14 ">{roomName.Room2}</div>
                  <button
                    className="bg-blue-500 border border-blue-400 text-white rounded-md px-2 mr-2 h-6  hover:bg-blue-400"
                    onClick={() => {
                      changeRoom("Room2");
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
              <div className=" bg-blue-100 mb-5 rounded pb-1 w-11/12 mx-auto overflow-y-auto shadow-2xl">
                {props.allUsers["Room2"]?.length ? (
                  props.allUsers["Room2"]?.map((data, index) => (
                    <div
                      key={index}
                      className="flex mx-3  border-b border-gray-300"
                    >
                      <img
                        className=" h-5 w-5 object-contain"
                        src={data.icon}
                        alt=""
                      />
                      <div>
                        {data.username} ({data.id})
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mx-3 text-red-400">{props.emptyMes}</div>
                )}
              </div>
              <div className=" bg-yellow-200 w-11/12 h-8 mt-2 mx-auto rounded overflow-hidden">
                <div className="flex justify-between h-8 w-full items-center text-center">
                  <div className="flex-grow pl-14 ">{roomName.Room3}</div>
                  <button
                    className="bg-blue-500 border border-blue-400 text-white rounded-md px-2 mr-2 h-6  hover:bg-blue-400"
                    onClick={() => {
                      changeRoom("Room3");
                    }}
                  >
                    Join
                  </button>
                </div>
              </div>
              <div className=" bg-yellow-100 mb-5 rounded pb-1 w-11/12 mx-auto overflow-y-auto shadow-2xl">
                {props.allUsers["Room3"]?.length ? (
                  props.allUsers["Room3"]?.map((data, index) => (
                    <div
                      key={index}
                      className="flex mx-3  border-b border-gray-300"
                    >
                      <img
                        className=" h-5 w-5 object-contain"
                        src={data.icon}
                        alt=""
                      />
                      <div>
                        {data.username} ({data.id})
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mx-3 text-red-400">{props.emptyMes}</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <ChatRoom
          username={username}
          userId={userId}
          room={room}
          setRoom={setRoom}
          icon={icon}
          allUsers={props.allUsers}
          roomName={roomName}
        />
      )}
    </div>
  );
};

export default Home;
