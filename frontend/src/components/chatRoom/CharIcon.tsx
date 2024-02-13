import React, { useEffect, useState } from "react";

type Props = {
  position: { x: number; y: number };
  icon: string;
  imageWay: number;
  msg: string;
  username: string;
};

const CharIcon = (props: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="w-28  sm:w-36 h-44  flex flex-col items-center  absolute "
      style={{
        top: props.position.y,
        left: props.position.x / (isMobile ? 1.34 : 1),
      }}
    >
      {props.msg ? (
        <div className="w-full max-h-28 bg-white rounded-lg p-1 border-2 border-blue-600 shadow-xl mt-auto overflow-hidden hover:z-10">
          <div className="text-center text-xs ">{props.msg}</div>
        </div>
      ) : (
        ""
      )}
      <div className="mt-auto">
        <div>
          {props.imageWay == -1 ? (
            <img
              src={props.icon}
              alt=""
              className={`w-16 h-16 mx-auto sm:w-20 sm:h-20 object-contain transform scale-x-[-1]`}
            />
          ) : (
            <img
              src={props.icon}
              alt=""
              className={`w-16 h-16 mx-auto sm:w-20 sm:h-20 object-contain transform scale-x-[1]`}
            />
          )}
          <div className="bg-white rounded-xl border border-blue-500 text-center text-xs px-1">
            {props.username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharIcon;
