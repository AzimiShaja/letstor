import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (ev) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.value,
    }));
  };

  const { email, password } = formData;
  return (
    <div className="min-h-[925px] bg-slate-900 p-10  flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-3">
        <AiOutlineUser className="text-[5rem] text-white" />
        <h1 className="text-4xl  font-bold  text-white">Sign in</h1>
        <p className="text-xl  font-light  text-white">
          Login into your account
        </p>
      </div>

      <div className="max-w-[500px]">
        <form className="flex flex-col gap-3 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            id="email"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            id="password"
            onChange={onChangeHandler}
          />
          <div className="flex w-full justify-between my-4 max-md:flex-col max-md:items-center gap-5">
            <p className="font-light text-gray-300 text-center">
              Don't have an account?{" "}
              <Link to={"/sign-up"} className=" underline text-white">
                Register now
              </Link>
            </p>
            <Link>
              <p className="text-blue-500">Forgot Password</p>
            </Link>
          </div>
          <div className="flex flex-col gap-4 ">
            <button className="bg-blue-500 border border-blue-700 text-white p-3 rounded-lg hover:bg-transparent duration-300">
              Sign in
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center after:border-t  after:flex-1 ">
              <p className="text-center font-semibold mx-4 text-white">OR</p>{" "}
            </div>
            <OAuth />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
