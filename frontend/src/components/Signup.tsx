import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconSlect from "./IconSlect";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

type Props = {
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [icon, setIcon] = useState<string>(
    "https://1.bp.blogspot.com/--c0K8UbKthw/USSkrgcx9EI/AAAAAAAANWI/wSq7qttn9Lg/s400/hiyoko.png"
  );

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !username || !password) {
        toast.error("Please enter email, username and password", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post("http://localhost:3006/users", {
        email: email,
        password: password,
        username: username,
        icon: icon,
      });

      if (response?.data?.email) {
        props.setIsLoginSuccess(true);
        navigate("/login");
      } else {
        toast.error("Error: failed to create user", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error: your email is already used", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="bg-white w-11/12 sm:w-500px mx-auto rounded-xl ">
      <div className="text-center text-3xl mt-10 pt-5">Sign up</div>
      <form onSubmit={handleCreateUser} method="post">
        <div className="k w-10/12 my-1 mx-auto">
          <div className="flex flex-col mx-10">
            <div className="flex">
              <FiMail className="mt-1 mr-1" />
              <label className="text-gray-600" htmlFor="email">
                Email
              </label>
            </div>
            <input
              className="border border-gray-300 rounded-2xl w-auto pt-1 pb-1 pl-2"
              placeholder="type email address"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className=" w-10/12 my-1 mx-auto">
          <div className="flex flex-col mx-10">
            <div className="flex">
              <FiLock className="mt-1 mr-1" />
              <label className="text-gray-600" htmlFor="password">
                Password
              </label>
            </div>
            <input
              className="border border-gray-300 rounded-2xl w-auto pt-1 pb-1 pl-2"
              placeholder="Type password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className=" w-10/12 my-1 mx-auto">
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
        <div className="">
          <div className=" w-full my-3 text-center text-lg">
            Choose your icon
          </div>
          <IconSlect icon={icon} setIcon={setIcon} />
        </div>
        <div className="flex justify-between w-9/12 mx-auto py-3">
          <button
            type="submit"
            className="border border-blue-200 bg-blue-500 text-white rounded-xl px-4 py-1 hover:bg-blue-600"
          >
            Create
          </button>
          <button
            className="border border-red-200 bg-red-500 text-white rounded-xl px-4 py-1 hover:bg-red-600"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
