import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../api/firebase";
import Spinner from "../components/Spinner";
import { MdLocationPin } from "react-icons/md";
import { BiBed, BiBath, BiChair, BiSolidParking } from "react-icons/bi";
import { getAuth } from "firebase/auth";
import ImageSlider from "../components/Slider";
import MessagePopup from "../components/MessagePopup";
const Listing = () => {
  const auth = getAuth();
  const params = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchData();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className=" h-full flex flex-col gap-10">
      <ImageSlider imgs={listing.imgUrls} />
      <div className="flex gap-5 flex-col py-4 max-md:items-center  px-8 ">
        <div className="flex items-center  gap-5 max-md:flex-col">
          <h1 className="text-4xl max-md:text-4xl text-slate-900 font-bold max-lg:text-center">
            {listing.name} !
          </h1>
          <p className="text-blue-500 text-3xl font-bold max-md:text-2xl text-center">
            ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
        </div>
        <p className="text-slate-600 text-lg  font-light flex items-center gap-1 max-md:text-sm text-center">
          {" "}
          <MdLocationPin /> {listing.address}
        </p>
        <button className="bg-red-500 px-4 py-2 text-white rounded-lg cursor-auto max-w-md text-lg">
          {listing.type === "rent" ? "For Rent" : "For Sale"}
        </button>
        {listing.discount > 0 && (
          <button className="bg-green-700 cursor-auto px-4 py-2 text-white text-lg rounded-lg  max-w-md ">
            ${listing.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            discount
          </button>
        )}

        <div className="my-4">
          <p className="text-slate-900  max-w-md text-sm ">
            <span className="font-bold "> Description- </span>{" "}
            {listing.description}
          </p>
        </div>
        <div className="flex justify-between max-w-md max-md:flex-col gap-4">
          <p className="text-slate-900 flex items-center gap-1 font-bold">
            <BiBed className="text-xl" /> {listing.beds} Beds
          </p>
          <p className="text-slate-900 flex items-center gap-1 font-bold">
            <BiBath className="text-xl" /> {listing.baths} Baths
          </p>
          {listing.furnished && (
            <p className="text-slate-900 flex items-center gap-1 font-bold">
              <BiChair className="text-xl" /> furnished
            </p>
          )}

          {listing.parking && (
            <p className="text-slate-900 flex items-center gap-1 font-bold">
              <BiSolidParking className="text-xl" />
              Parking spot
            </p>
          )}
        </div>
        {!openForm && (
          <div>
            <button
              onClick={() => {
                setOpenForm(true);
              }}
              className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:opacity-75 max-w-md text-lg"
            >
              Contact Landlord
            </button>
          </div>
        )}
        <MessagePopup onClick={() => setOpenForm(false)} trigger={openForm} />
      </div>
    </div>
  );
};

export default Listing;
