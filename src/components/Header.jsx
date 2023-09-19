import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const [pageState, setPageState] = useState("sign in");
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("profile");
      } else {
        setPageState("sign in");
      }
    });
  }, [auth]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <header className="p-4 lg:justify-around flex items-center justify-between">
        <div>
          <Link to={"/"} className="flex items-center gap-2 text-2xl">
            <AiFillHome className="text-red-500" />
            <h1>
              <span className="text-red-500 font-dancing text-4xl">let's</span>
              Tor
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-10 text-lg max-md:hidden links">
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
            className={` ${pathname === "/category/sale" ? "active-link" : ""}`}
            href="/category/sale"
          >
            Buy
          </a>
          <a
            className={` ${pathname === "/category/rent" ? "active-link" : ""}`}
            href="/category/rent"
          >
            Rent
          </a>

          <a
            className={` ${
              pathname === "/sign-in" || pathname === "/profile"
                ? "active-link"
                : ""
            }`}
            href={`${pageState === "sign in" ? "/sign-in" : "/profile"}`}
          >
            {pageState === "sign in" ? (
              "Login"
            ) : (
              <FaUser className="text-2xl" />
            )}
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
          className={` ${pathname === "/category/sale" ? "active-link" : ""}`}
          href="/category/sale"
        >
          Buy
        </a>
        <a
          className={` ${pathname === "/category/rent" ? "active-link" : ""}`}
          href="/category/rent"
        >
          Rent
        </a>
        <a
          className={` ${
            pathname === "/sign-in" || pathname === "/profile"
              ? "active-link"
              : ""
          }`}
          href={`${pageState === "sign in" ? "/sign-in" : "/profile"}`}
        >
          {pageState === "sign in" ? "sign in" : "Profile"}
        </a>
      </div>
    </div>
  );
};

export default Header;
