import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
const OAuth = () => {
  return (
    <button className="flex items-center gap-2 border border-red-900 bg-red-900 p-3 rounded-md hover:bg-transparent duration-300  justify-center text-white">
      Continue with <AiFillGoogleCircle className="text-2xl" />{" "}
    </button>
  );
};

export default OAuth;
