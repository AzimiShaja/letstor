import { getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "test",
    email: "test@gmail.com",
  });

  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };
  const { name, email } = formData;
  return (
    <>
      <div className="bg-slate-900 text-white h-full flex flex-col items-center py-10 px-10">
        <h1 className="text-4xl">My Profile</h1>
        <div className="mt-10 w-full md:w-7/12 lg:w-6/12 xl:w-5/12">
          <form className="flex flex-col gap-2 text-black">
            <label className="text-white" htmlFor="">
              Name:
            </label>
            <input type="text" id="name" value={name} />
            <label className="text-white" htmlFor="">
              Email:
            </label>
            <input type="email" id="email" value={email} />
            <div className="flex justify-between items-center my-4 max-md:flex-col gap-3">
              <p className="text-white text-center">
                Do you want to change your name?
                <span className="text-red-500 cursor-pointer"> Edit</span>{" "}
              </p>
              <p
                onClick={logoutHandler}
                className="text-white hover:text-red-500 duration-150 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
