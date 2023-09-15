import React from "react";
import { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    price: 1,
    discount: 0,
  });
  const {
    type,
    name,
    beds,
    baths,
    parking,
    furnished,
    address,
    description,
    offer,
    price,
    discount,
  } = formData;
  const onChangeHandler = () => {};

  return (
    <div className="py-10 bg-slate-900 h-full text-white flex flex-col items-center gap-5">
      <h1 className="text-3xl  font-bold text-center">Create a Listing</h1>
      <form className="my-10 flex flex-col min-w-[300px]  gap-5">
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Sale / Rent</p>
          <div className="flex w-full  justify-between">
            <button
              type="button"
              className={`${
                type === "sale"
                  ? "bg-blue-700 text-white"
                  : "  bg-white text-black"
              } py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Sale
            </button>
            <button
              type="button"
              className={`${
                type === "rent"
                  ? "bg-blue-700 text-white"
                  : "bg-white text-black"
              } py-2 px-4 rounded-sm min-w-[135px]`}
            >
              Rent
            </button>
          </div>
        </div>
        <div className="flex w-full justify-between gap-4">
          <div>
            <p>Beds</p>
            <input
              type="number"
              className="max-w-[135px] text-black text-center"
              value={beds}
              onChange={onchange}
            />
          </div>
          <div>
            <p>Baths</p>
            <input
              type="number"
              className=" text-center max-w-[135px] text-black"
              value={baths}
              onChange={onchange}
            />
          </div>
        </div>
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Parking spot</p>
          <div className="flex w-full  justify-between">
            <button
              type="button"
              value={true}
              className={`${
                parking ? "bg-blue-700 text-white" : " bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes
            </button>
            <button
              type="button"
              value={false}
              className={`${
                !parking ? "bg-blue-700 text-white" : "bg-white text-black"
              } py-2 px-4 rounded-sm min-w-[135px]`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Furniture</p>
          <div className="flex w-full  justify-between">
            <button
              type="button"
              value={true}
              className={`${
                furnished ? "bg-blue-700 text-white" : "bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes{" "}
            </button>
            <button
              type="button"
              value={false}
              className={`${
                !furnished ? "bg-blue-700 text-white" : "bg-white text-black"
              } py-2 px-4 rounded-sm min-w-[135px]`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold">Address</p>
          <textarea
            value={address}
            name="address"
            className="rounded-md w-full text-black"
            onChange={onchange}
          ></textarea>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold">Description</p>
          <textarea
            value={description}
            className="rounded-md w-full text-black"
            id="description"
            onChange={onchange}
          ></textarea>
        </div>
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex w-full  justify-between">
            <button
              type="button"
              value={true}
              className={`${
                offer ? "bg-blue-700 text-white" : " bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes
            </button>
            <button
              type="button"
              value={false}
              className={`${
                !offer ? "bg-blue-700 text-white" : "bg-white text-black"
              } py-2 px-4 rounded-sm min-w-[135px]`}
            >
              No
            </button>
          </div>
        </div>
        <div className="flex items-start gap-1 flex-col">
          <p className="text-lg font-semibold">Regular Price</p>
          <div className="flex items-center  gap-4">
            <div>
              <input
                type="number"
                className=" text-center max-w-[135px] text-black"
                value={price}
                onChange={onchange}
              />
            </div>
            {type !== "sale" ? (
              <div>
                <p>$ / month</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {offer ? (
          <div className="flex items-start gap-1 flex-col">
            <p className="text-lg font-semibold">Discounted Price</p>
            <input
              type="number"
              className=" text-center max-w-[135px] text-black"
              value={discount}
              onChange={onchange}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex-col flex gap-3">
          <div>
            <p className="text-lg font-semibold">Images</p>
            <p className="font-light text-gray-300">
              The first image will be the cover (max 6)
            </p>
          </div>
          <input
            type="file"
            id="images"
            className="text-black"
            onchange={onchange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 w-full py-3 rounded-md hover:opacity-80 mt-6 active:opacity-60 duration-300"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
