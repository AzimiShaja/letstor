import React from "react";
import spinner from "../assets/preload.svg";

const Spinner = () => {
  return (
    <div className=" flex h-screen  w-full  items-center justify-center bg-white">
      <div>
        <img className="h-[150px] w-[150px]" src={spinner} alt="" />
      </div>
    </div>
  );
};

export default Spinner;
