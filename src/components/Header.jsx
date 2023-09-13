import React from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="p-4 lg:justify-around flex items-center justify-between border-b-2 shadow-md sticky top-0 z-50">
        <div>
          <Link to={"/"} className="flex items-center gap-2 text-2xl">
            <AiFillHome className="text-red-500" />
            <h1>
              <span className="text-red-500 font-dancing text-4xl">let's</span>
              Tor
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-10 text-xl max-md:hidden links">
          <a className={` ${pathname === "/" ? "active-link" : ""}`} href="/">
            Home
          </a>
          <a
            className={` ${pathname === "/offers" ? "active-link" : ""}`}
            href="/offers"
          >
            Offers
          </a>
          <a
            className={` ${pathname === "/sign-in" ? "active-link" : ""}`}
            href="/sign-in"
          >
            Sign in
          </a>
        </div>
        <AiOutlineMenu
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="text-3xl md:hidden"
        />
      </header>
      <div
        className={` ${
          isOpen ? "active-nav" : "off-nav"
        } flex flex-col bg-gray-100 items-center gap-5 py-4 text-lg md:hidden  links`}
      >
        <a className={` ${pathname === "/" ? "active-link" : ""}`} href="/">
          Home
        </a>
        <a
          className={` ${pathname === "/offers" ? "active-link" : ""}`}
          href="/offers"
        >
          Offers
        </a>
        <a
          className={` ${pathname === "/sign-in" ? "active-link" : ""}`}
          href="/sign-in"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Header;