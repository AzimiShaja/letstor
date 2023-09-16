import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TbHomeStats } from "react-icons/tb";
import { useEffect } from "react";
import { db } from "../api/firebase";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };
  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: [e.target.value],
    }));
  };

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  }
  const { name, email } = formData;

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listingsItem = [];
      querySnap.forEach((doc) => {
        return listingsItem.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsItem);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onDelete = async (id) => {
    if (window.confirm("Are you sure to delete? ")) {
      await deleteDoc(doc(db, "listings", id));
      const updatedListings = listings.filter((listing) => {
        listing.id !== id;
      });
      setLoading(true);
      setListings(updatedListings);
      toast.success("Item has been deleted successfully");
    }
    setLoading(false);
  };
  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };
  return (
    <>
      <div className="bg-slate-900 text-white h-full flex flex-col items-center py-10 px-10">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <div className="mt-10 w-full md:w-7/12 lg:w-6/12 xl:w-5/12">
          <form className="flex flex-col gap-2 text-black">
            <label className="text-white" htmlFor="">
              Name:
            </label>
            <input
              className={`${changeDetail ? "bg-red-200 focus:bg-red-200" : ""}`}
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChangeHandler}
            />
            <label className="text-white mt-4" htmlFor="">
              Email:
            </label>
            <input type="email" id="email" value={email} disabled />
            <div className="flex justify-between items-center my-4 max-md:flex-col gap-3">
              <p className="text-white text-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev);
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  {" "}
                  {changeDetail ? "Apply change" : "Edit"}
                </span>{" "}
              </p>
              <p
                onClick={logoutHandler}
                className="text-white hover:text-red-500 duration-150 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <div className="my-10">
            <Link to={"/create-listing"}>
              <button
                type="submit"
                className="bg-blue-700 p-4 rounded-md w-full flex items-center gap-2  justify-center hover:opacity-90 duration-300"
              >
                Sell or Rent your house <TbHomeStats className="text-3xl" />
              </button>
            </Link>
          </div>
        </div>
        {!loading && listings.length > 0 && (
          <div className="flex flex-col items-center gap-10 my-10">
            <h1 className="text-2xl font-bold">My Listings</h1>
            <div className="lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-10 ">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => {
                      onEdit(listing.id);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
