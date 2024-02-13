import React, { useEffect, useState } from "react";
import { getAuth } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { UserType } from "../type";
import { getLoginUserData } from "../helper/userHelper";
import Header from "./Header";
import IconSlect from "./IconSlect";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser } from "react-icons/fi";

const UserData = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserType>({
    _id: "",
    email: "",
    password: "",
    username: "",
    icon: "",
  });
  const [username, setUsername] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  useEffect(() => {
    getAuth(navigate); //check if login or not
    //get user data from helper fucction
    const fetchData = async () => {
      const userData = await getLoginUserData();
      if (userData?.username) {
        setUserData(userData);
        setUsername(userData?.username);
        setIcon(userData?.icon);
      }
    };
    fetchData();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    console.log(icon);
    try {
      if (icon === userData?.icon && username === userData?.username) {
        //do nothing,then close update form
        setIsUpdate(false);
        return;
      }

      const response = await axios.put(
        `http://localhost:3006/users/${userData?._id}`,
        {
          username: username,
          icon: icon,
        }
      );

      if (response?.data?.username) {
        const username: string = response?.data?.username;
        const icon: string = response?.data?.icon;
        const updateUserData: UserType = {
          ...userData,
          username: username,
          icon: icon,
        };

        setUserData(updateUserData);
        setIsUpdate(false);
        toast.success("update user data successfully", {
          position: "top-center",
          autoClose: 3000,
        });

        //navigate("/login");
      } else {
        toast.error("Error: failed to update user", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error during update:", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="w-full">
      <Header />

      {isUpdate ? (
        <form
          onSubmit={handleUpdateUser}
          method="post"
          className="bg-white w-11/12 sm:w-500px mx-auto rounded-xl mt-7"
        >
          <div className="text-center mt-3 py-1 text-lg border-b bg-green-300 rounded-t-2xl">
            Update Profile
          </div>

          <div className=" w-10/12 my-3 mx-auto">
            <div className="flex flex-col mx-10">
              <div className="flex">
                <FiUser className="mt-1 mr-1" />
                <label className="text-gray-600" htmlFor="username">
                  Username
                </label>
              </div>
              <input
                className="border border-gray-300 rounded-2xl w-auto pt-1 pb-1 pl-2"
                placeholder="Type username max 15"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  if (e.target.value.length <= 15) setUsername(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <IconSlect icon={icon} setIcon={setIcon} />
          <div className="flex justify-between w-9/12 mx-auto py-3">
            <button
              type="submit"
              className="border border-blue-200 bg-blue-500 text-white rounded-xl px-4 py-1 hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => {
                setIsUpdate(false);
                setUsername(userData.username);
                setIcon(userData.icon);
              }}
              type="button"
              className="border border-red-200 bg-red-500 text-white rounded-xl px-4 py-1 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className=" w-10/12 sm:w-500px mx-auto bg-white rounded-2xl shadow-2xl mt-7">
          <div className="text-center text-lg py-1 bg-green-300 rounded-t-2xl">
            Your profile
          </div>
          <div className="w-11/12 mx-auto pt-1">
            <div className="flex justify-end ">
              <button
                className="border border-blue-200 bg-blue-500 text-white rounded-xl px-4 py-1 hover:bg-blue-600"
                onClick={() => {
                  setIsUpdate(true);
                }}
              >
                Update Profile
              </button>
            </div>

            <div className="border border-gray-400 w-32 h-32 mx-auto rounded-full bg-white my-3 flex justify-center items-center">
              <img
                className="w-4/5 h-4/5 object-contain hover:animate-bounce"
                src={userData?.icon}
                alt=""
              />
            </div>
            <div className="flex justify-center text-sm sm:text-base space-x-2  bg-white mx-auto overflow-auto pb-2">
              <div>
                <div className="my-1">Username:</div>
                <div className="my-1">User ID:</div>
                <div className="my-1">Email :</div>
              </div>
              <div>
                <div className="my-1">{userData?.username}</div>
                <div className="my-1">{userData?._id}</div>
                <div className="my-1">{userData?.email}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserData;
