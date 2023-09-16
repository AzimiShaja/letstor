import React from "react";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <Link
      to={`/category/${listing.type}/${id}`}
      id={id}
      className="bg-white text-slate-900 rounded-md hover:scale-105 duration-300 shadow-sm shadow-gray-50 flex flex-col justify-between"
    >
      <img
        className="rounded-t-md min-h-[200px] max-h-[200px]"
        src={listing.imgUrls[0]}
        loading="lazy"
      />

      <Link
        to={`/category/${listing.type}/${id}`}
        className="flex  flex-col gap-5 p-3 "
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
              ? listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
        </div>
      </Link>
      <div className="flex justify-between p-3">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-md font-semibold">
              {listing.beds > 1 ? `${listing.beds} Beds` : `1 Bed`}
            </p>
          </div>
          <div>
            <p className="text-md font-semibold">
              {listing.baths > 1 ? `${listing.baths} Baths` : `1 Baths`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xl">
          {onEdit && (
            <button onClick={() => onEdit(listing.id)}>
              <FiEdit2 />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(listing.id)}>
              <MdDelete className="text-red-600" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingItem;
