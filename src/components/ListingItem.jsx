import React from "react";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";

const ListingItem = ({ listing, id }) => {
  return (
    <div
      id={id}
      className="bg-white text-slate-900 rounded-md hover:scale-105 duration-300 shadow-sm shadow-gray-50 flex flex-col justify-between"
    >
      <img
        className="rounded-t-md min-h-[200px] "
        src={listing.imgUrls[0]}
        loading="lazy"
      />
      <Link
        className="flex  flex-col gap-5 p-3 "
        to={`/category/${listing.type}/${id}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 text-md text-gray-500">
            <ImLocation className="text-green-500" />
            <p>{listing.address}</p>
          </div>
          <p className="text-xl font-bold">{listing.name}</p>
          <p className="text-red-600 font-bold">
            $
            {listing.offer
              ? listing.discount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex justify-between">
            <div>
              <p className="text-md">
                {listing.beds > 1 ? `${listing.beds} Beds` : `1 Bed`}
              </p>
            </div>
            <div>
              <p className="text-md">
                {listing.baths > 1 ? `${listing.baths} Baths` : `1 Baths`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;