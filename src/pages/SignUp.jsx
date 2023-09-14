import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../api/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (ev) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.value,
    }));
  };

  const onSubmitHandler = async (ev) => {
    ev.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong while signing up");
    }
  };

  const { email, password, name } = formData;
  return (
    <div className="min-h-[925px] bg-slate-900 p-10  flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-3">
        <AiOutlineUser className="text-[5rem] text-white" />
        <h1 className="text-4xl  font-bold  text-white">Sign up</h1>
        <p className="text-xl  font-light  text-white">Register account</p>
      </div>

      <div className="max-w-[500px]">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            id="name"
            onChange={onChangeHandler}
          />
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
              Already have an account?{" "}
              <Link to={"/sign-in"} className=" underline text-white">
                login now
              </Link>
            </p>
            <Link>
              <p className="text-blue-500">Forgot Password</p>
            </Link>
          </div>
          <div className="flex flex-col gap-4 ">
            <button className="bg-gradient-to-l from-red-900 to-blue-600 bg-blue-500 text-white p-3 rounded-lg hover:opacity-75 duration-300">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
