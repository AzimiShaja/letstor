import bg from "../assets/bg.jpeg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ListingItem from "../components/ListingItem";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../api/firebase";
import Spinner from "../components/Spinner";
import Feauters from "../components/Feauters";

const Home = () => {
  const [pageState, setPageState] = useState("sign in");
  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("profile");
      } else {
        setPageState("sign in");
      }
    });
  }, [auth]);
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for rent
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="bg-slate-900 h-[400px] hero  flex px-40 py-20">
        <div className=" max-w-lg flex flex-col gap-5">
          <h1 className="text-white font-bold text-4xl leading-[50px] max-lg:text-2xl max-md:text-xl">
            Where dreams find a <span className="text-slate-900">Home</span> and
            <span className="text-slate-900"> Keys</span> unlock new beginnings
            in the world of house renting and selling.
          </h1>
          <Link to={`${pageState === "sign in" ? "/sign-in" : "/profile"}`}>
            <button className=" text-white rounded-lg border px-3 py-1  hover:opacity-75 text-lg">
              Get started
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col px-5 lg:px-40 ">
        {offerListings && offerListings.length > 0 && (
          <div className=" flex flex-col gap-6 mt-10  py-3 mb-10">
            <div>
              <h2 className="px-3 text-2xl  font-semibold">Recent offers</h2>
              <Link to="/offers">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more offers
                </p>
              </Link>
            </div>

            <div className="lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-10 ">
              {offerListings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                );
              })}
            </div>
          </div>
        )}
        <Feauters />
        {rentListings && rentListings.length > 0 && (
          <div className=" flex flex-col gap-6 py-3 mb-10">
            <div>
              {" "}
              <h2 className="px-3 text-2xl font-semibold ">Places for rent</h2>
              <Link to="/category/rent">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for rent
                </p>
              </Link>
            </div>

            <div className="lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-10 ">
              {rentListings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                );
              })}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=" flex flex-col gap-6  py-3">
            <div>
              <h2 className="px-3 text-2xl  font-semibold">Places for sale</h2>
              <Link to="/category/sale">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for sale
                </p>
              </Link>
            </div>

            <div className="lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-10 ">
              {saleListings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
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

export default Home;
