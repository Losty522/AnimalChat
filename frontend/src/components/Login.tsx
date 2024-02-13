import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../auth/auth";
import { FiMail, FiLock } from "react-icons/fi";

type Props = {
  isLoginSuccess: boolean;
  setIsLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.isLoginSuccess) {
      toast.success("created user successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      props.setIsLoginSuccess(false);
    }
  }, [props.isLoginSuccess]);

  useEffect(() => {
    getAuth(navigate, "/");
  }, []);

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3006/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // successful
        //console.log("Login successful");
        navigate("/");
      } else {
        //console.error("Login failed");
        toast.error("invalid username or password", {
          position: "top-center",
          autoClose: 3000,
        });

        //setErrMsg("invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="bg-white w-11/12 sm:w-500px mx-auto rounded-xl ">
      <div className="text-center text-3xl mt-10 pt-5">Login</div>
      <form onSubmit={handleSubmitLogin} method="post">
        <div className="k w-10/12 my-5 mx-auto">
          <div className="flex flex-col mx-10">
            <div className="flex">
              <FiMail className="mt-1 mr-1" />
              <label className="text-gray-600 " htmlFor="email">
                Email
              </label>
            </div>
            <input
              className="border border-gray-300 rounded-2xl w-auto pt-1 pb-1 pl-2"
              placeholder="Type your email address"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className=" w-10/12 my-5 mx-auto">
          <div className="flex flex-col mx-10">
            <div className="flex">
              <FiLock className="mt-1 mr-1" />
              <label className="text-gray-600" htmlFor="password">
                Password
              </label>
            </div>
            <input
              className="border border-gray-300 rounded-2xl w-auto pt-1 pb-1 pl-2"
              placeholder="Type your password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="w-full  flex justify-center mt-10">
          <button
            className="border border-blue-200 bg-blue-500 text-white rounded-xl px-4 py-1 hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="flex justify-center mt-10 pb-5 hover:text-red-500">
          <a href="signup">SIGN UP</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
