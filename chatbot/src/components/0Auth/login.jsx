import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  return (
    <>
      <section className="w-full h-screen bg-gray-800 flex items-center justify-center text-white flex-col">
        <form className="bg-gray-600 p-5 rounded-2xl w-1/3 h-1/3">
          <h2 className="font-syne font-bold text-2xl text-center">Login</h2>
          <div className="m-2 ">
            <label htmlFor="email"></label>
            <input
              type="text"
              id="email"
              placeholder="email"
              name="email"
              className="bg-gray-300 rounded-2xl w-full px-3 py-2 text-black focus-within:outline-0 placeholder:text-gray-600"
            />
          </div>
          <div className="m-2">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              className="bg-gray-300 rounded-2xl w-full px-3 py-2 text-black focus-within:outline-0 placeholder:text-gray-600"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="w-3/6 bg-blue-500 py-1 px-3 rounded-2xl box-border">
              Login
            </button>
          </div>
        </form>
        <div className="bg-gray-500/20 mt-4 px-9 rounded-2xl">
          <p>
            Create new account{" "}
            <Link to={"/signup"} className="text-blue-400">
              signup
            </Link>
          </p>
          <p>
            Go to{" "}
            <Link to={"/"} className="text-blue-400">
              Home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
