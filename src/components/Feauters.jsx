import React, { useEffect, useState } from "react";
import { FiSearch, FiCheckCircle } from "react-icons/fi";
import { BsShieldCheck, BsCashCoin, BsBuildings } from "react-icons/bs";
import { LuContact2 } from "react-icons/lu";

const Feauters = () => {
  const [contendLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentLoaded(true);
    }, 400);
  }, []);

  return (
    <div
      className={`flex item-center px-5 py-20 flex-col  gap-20 ${
        contendLoaded ? "animate" : "stop-animating"
      } translate-y-full`}
    >
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl lg:text-[40px] font-bold text-slate-900">
          Find your next perfect place with ease
        </h1>
        <p className="font-light text-sm ">
          Let'sTor will help you find your home fast, easy and comfortable. Our
          expert support are always available.
        </p>
      </div>
      <div className="grid-cols-3 grid max-md:grid-cols-1">
        <div className="flex flex-col items-center justify-center gap-3 border-r border-b min-h-[400px]">
          <FiSearch className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Find</h2>
          <p className="max-w-[250px] text-center font-light">
            We provide various types of properties from the Cheapest to Premium
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 border-r border-b min-h-[400px]">
          <BsShieldCheck className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Quality</h2>
          <p className="max-w-[250px] text-center font-light ">
            Get your dream house with us and we guarantee the best quality
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3  min-h-[400px] border-b">
          <BsBuildings className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Updated</h2>
          <p className="max-w-[250px] text-center font-light ">
            All the Information on the listings will always be 100% up to date
            no matter what
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 border-r min-h-[400px]">
          <BsCashCoin className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Cost</h2>
          <p className="max-w-[250px] text-center font-light ">
            Buy or rent a property through our app and get it with the lowest
            cost
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 border-r min-h-[400px]">
          <LuContact2 className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="max-w-[250px] text-center font-light ">
            Get in contact straight with the owner no intermediaries of any kind
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3  min-h-[400px]">
          <FiCheckCircle className="text-[50px] text-slate-900" />
          <h2 className="text-2xl font-bold">Result</h2>
          <p className="max-w-[300px] text-center font-light ">
            Get your dream house, get your desired price, get the best result
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feauters;
