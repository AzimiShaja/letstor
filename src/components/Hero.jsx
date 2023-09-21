import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Hero = ({ pageState }) => {
  const [contendLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setContentLoaded(true);
  }, []);

  return (
    <div className=" bg-slate-900 lg:h-[600px]  hero  flex lg:px-40 px-4 py-40 ">
      <div
        className={` ${
          contendLoaded ? "animate" : "stop_animating"
        } max-w-lg flex flex-col gap-5 -translate-y-full`}
      >
        <h1 className="text-white font-bold text-4xl leading-[50px] max-lg:text-2xl max-md:text-lg">
          Where dreams find a <span className="text-slate-900">Home</span> and
          <span className="text-slate-900"> Keys</span> unlock new beginnings in
          the world of house renting and selling.
        </h1>
        <Link to={`${pageState === "sign in" ? "/sign-in" : "/profile"}`}>
          <button className=" text-white rounded-lg border px-3 py-1  hover:opacity-75 text-lg">
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
