import React, { useState } from "react";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MessagePopup = ({ trigger, onClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const resetForm = () => {
    setFormData(() => {
      return { name: "", email: "", message: "" };
    });
  };

  const onChangeHandler = (ev) => {
    setFormData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const { name, email, message } = formData;
  return trigger ? (
    <div
      onClick={onClick}
      className="flex h-screen fixed top-0 left-0 z-50 bg w-full items-center justify-center"
    >
      <div className="flex flex-col gap-4 bg-white  fixed p-1 rounded-xl">
        <button className="relative top-0 right-0" onClick={onClick}>
          <AiOutlineClose className="text-3xl hover:text-red-500" />
        </button>
        <div className="p-10 flex flex-col gap-10 items-center">
          <div>
            <Link to={"/"} className="flex items-center gap-2 text-2xl">
              <AiFillHome className="text-red-500" />
              <h1>
                <span className="text-red-500 font-dancing text-4xl">
                  let's
                </span>
                Tor
              </h1>
            </Link>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Send a Message to Owner
          </h1>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              toast.info("Your message has been sent");
              resetForm();
            }}
            className="flex flex-col gap-4"
          >
            <input
              name="name"
              value={name}
              type="text"
              placeholder="full name"
              onChange={onChangeHandler}
              required
            />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email"
              onChange={onChangeHandler}
              required
            />
            <textarea
              name="message"
              value={message}
              placeholder="your message"
              onChange={onChangeHandler}
              required
            ></textarea>
            <button className="bg-blue-500 p-3 rounded-md text-white">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MessagePopup;
