import React, { useEffect, useState } from "react";
import CharIcon from "./CharIcon";
import { RoomArrType } from "../../type";
import { socket } from "../../socket";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
type Props = {
  icon: string;
  userId: string;
  room: string;
  allUsers: Record<string, RoomArrType[]>;
};

const CharField = (props: Props) => {
  const [bgImage, setBgImage] = useState({
    backgroundImage: `url('/1403443.png')`, //default
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  });

  useEffect(() => {
    if (props.room === "Room1") {
      setBgImage({
        backgroundImage: `url('/1403443.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      });
    } else if (props.room === "Room2") {
      setBgImage({
        backgroundImage: `url('/22762140.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      });
    } else {
      setBgImage({
        backgroundImage: `url('/1413779.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      });
    }
  }, []);

  const handleMove = (drection: string) => {
    const index = props.allUsers[props.room]?.findIndex(
      (user) => user.id === props.userId
    );
    let iconMoveObj = {
      x: props.allUsers[props.room][index].position.x,
      y: props.allUsers[props.room][index].position.y,
      userId: props.userId,
      imageWay: props.allUsers[props.room][index].imageWay,
      index: index,
      room: props.room,
    };
    if (drection === "RIGHT") {
      iconMoveObj.x += 30;
      if (iconMoveObj.x > 330) return; //limitation on field
    } else if (drection === "LEFT") {
      iconMoveObj.x -= 30;
      if (iconMoveObj.x < 0) return; //limitation on field
    } else if (drection === "UP") {
      iconMoveObj.y -= 30;
      if (iconMoveObj.y < 0) return; //limitation on field
    } else if (drection === "DOWN") {
      iconMoveObj.y += 30;
      if (iconMoveObj.y > 210) return; //limitation on field
    } else if (drection === "RETURN") {
      iconMoveObj.imageWay = iconMoveObj.imageWay * -1;
    }

    socket.emit("icon_move", iconMoveObj); //send message to eveybody by System
  };

  return (
    <div>
      <div
        //className="w-500px mx-auto h-96  border border-black rounded-xl relative"
        className="w-360px h-400px sm:w-500px mx-auto border border-black rounded-xl relative"
        style={bgImage}
      >
        {props.allUsers[props.room]?.map((data, index) => (
          <CharIcon
            key={index}
            position={data.position}
            icon={data.icon}
            imageWay={data.imageWay}
            msg={data.latestMsg}
            username={data.username}
          />
        ))}
      </div>
      <div className="flex mx-auto justify-center items-end mt-1">
        <button
          onClick={() => {
            handleMove("LEFT");
          }}
          className="border boder-black bg-white w-11 h-11 flex justify-center items-center hover:bg-blue-100"
        >
          <RiArrowLeftLine />
        </button>
        <div>
          <button
            onClick={() => {
              handleMove("UP");
            }}
            className="border boder-black bg-white w-11 h-11 flex justify-center items-center hover:bg-blue-100"
          >
            <RiArrowUpLine />
          </button>
          <button
            onClick={() => {
              handleMove("DOWN");
            }}
            className="border boder-black bg-white w-11 h-11 flex justify-center items-center hover:bg-blue-100"
          >
            <RiArrowDownLine />
          </button>
        </div>
        <button
          onClick={() => {
            handleMove("RIGHT");
          }}
          className="border boder-black bg-white w-11 h-11 flex justify-center items-center hover:bg-blue-100"
        >
          <RiArrowRightLine />
        </button>
        <button
          onClick={() => {
            handleMove("RETURN");
          }}
          className="border boder-black bg-white w-11 h-11 ml-1 hover:bg-blue-100"
        >
          <div className="flex flex-col items-center relative">
            <img src={props.icon} alt="" className="w-7 h-7 object-contain" />
            <div className="text-sm absolute top-5">← →</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CharField;
