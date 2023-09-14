import React from "react";
import spinner from "../assets/spinner.svg";

const Spinner = () => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 flex  items-center justify-center">
      <div>
        <img className="h-[150px] w-[150px]" src={spinner} alt="" />
      </div>
    </div>
  );
};

export default Spinner;
