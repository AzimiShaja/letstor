import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsDashCircle } from "react-icons/bs";
import { useState, useEffect } from "react";

const Pricing = () => {
  const [contendLoaded, setContentLoaded] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const revealThreshold = 2500;

    if (scrollPosition > revealThreshold) {
      setContentLoaded(true);
    } else {
      setContentLoaded(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="py-20 flex-col flex gap-20 px-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl lg:text-[40px] font-bold text-slate-900 ">
          Select Your Subscription Plan
        </h1>
        <p className="font-light text-sm ">
          Let'sTor will help you find your home fast, easy and comfortable. Our
          expert support are always available.
        </p>
      </div>
      <div
        className={`${
          contendLoaded ? "animate" : "stop_animating"
        } grid grid-cols-3 xl:px-40 gap-20 max-md:grid-cols-1 translate-y-full`}
      >
        <div className="flex flex-col items-center gap-10 bg-gray-100 shadow-xl p-5 min-h-[500px] rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-red-500 text-2xl font-bold ">Free</h1>
            <h2 className="text-lg">
              $<span className="text-4xl">0</span>/Year
            </h2>
            <p className="text-md font-light">
              Become a{" "}
              <span className="text-4xl text-red-500 font-bold">Owner</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              99.5% Uptime Guarantee
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Register Up to 5 Listings
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              500MB Cloud Storage
            </p>
            <p className="flex gap-3 items-center">
              <BsDashCircle className="text-3xl text-red-500" />
              Exclusive Dashboard
            </p>
            <p className="flex gap-3 items-center">
              <BsDashCircle className="text-3xl text-red-500" />
              Personal Help Support
            </p>

            <p className="flex gap-3 items-center">
              <BsDashCircle className="text-3xl text-red-500" />
              Enterprise SLA
            </p>
          </div>
          <button className="p-3 border border-red-500 rounded-lg hover:bg-gray-200 duration-300">
            Start Free
          </button>
        </div>
        <div className="flex flex-col items-center gap-10 bg-gray-100 shadow-xl py-5 min-h-[500px] rounded-xl lg:scale-110">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-orange-500 text-2xl font-bold ">Basic</h1>
            <h2 className="text-lg">
              $<span className="text-4xl">49</span>/Year
            </h2>
            <p className="text-md font-light text-center">
              Become a{" "}
              <span className="text-3xl text-orange-500 font-bold">
                Real Estater
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              99.5% Uptime Guarantee
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Register Up to 5 Listings
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              500MB Cloud Storage
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Exclusive Dashboard
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Personal Help Support
            </p>

            <p className="flex gap-3 items-center">
              <BsDashCircle className="text-3xl text-red-500" />
              Enterprise SLA
            </p>
          </div>
          <button className="p-3 border border-orange-500 rounded-lg hover:bg-gray-200 duration-300">
            Start Basic
          </button>
        </div>
        <div className="flex flex-col items-center gap-10 bg-gray-100 shadow-xl p-5 min-h-[500px] rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-green-500 text-2xl font-bold ">Premium</h1>
            <h2 className="text-lg">
              $<span className="text-4xl">79</span>/Year
            </h2>
            <p className="text-md font-light">
              Become an{" "}
              <span className="text-4xl text-green-500 font-bold">Agent</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              99.5% Uptime Guarantee
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Register Up to 5 Listings
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              500MB Cloud Storage
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Exclusive Dashboard
            </p>
            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Personal Help Support
            </p>

            <p className="flex gap-3 items-center">
              <AiOutlineCheckCircle className="text-green-500 text-4xl" />
              Enterprise SLA
            </p>
          </div>
          <button className="p-3 border border-green-500 rounded-lg hover:bg-gray-200 duration-300">
            Start Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
