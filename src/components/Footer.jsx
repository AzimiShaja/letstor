import React from "react";
import {
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoWhatsapp,
  BiLogoTwitter,
  BiCopyright,
} from "react-icons/bi";

const Footer = () => {
  return (
    <>
      <div className="py-5 border-t flex flex-col items-center gap-5">
        <div className="flex gap-3 text-3xl text-slate-900 socials">
          <a target={"_blank"} href="https://www.instagram.com/shja.az/">
            <BiLogoInstagram />
          </a>
          <a target={"_blank"} href="https://github.com/AzimiShaja">
            <BiLogoGithub />
          </a>
          <a href="#home">
            <BiLogoWhatsapp />
          </a>
          <a target={"_blank"} href="https://twitter.com/AzimiShja">
            <BiLogoTwitter />
          </a>
        </div>
        <div className="flex  flex-col gap-1 items-center">
          <h1>Made with ❤️ By Ahmad Shaja Azimi</h1>
          <p className="flex items-center gap-1 text-center max-md:flex-col">
            Copyright
            <BiCopyright /> {new Date().getFullYear()} | All rights are
            reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
