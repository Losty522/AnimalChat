export type AllUsersType = {
  [key: string]: RoomArrType[];
}

export type RoomArrType = {
  id: string;
  username: string;
  icon:string;
  position:{x:number, y:number};
  imageWay:number;
  latestMsg:string;
  socketId:string;
}



export type messageType = {
  msg: string;
  user: string
  userId: string;
  unixTimestamp:number;
  room: string
}

export type UserType = {
  _id:string;
  email: string;
  password: string;
  username: string,
  icon: string,
}
