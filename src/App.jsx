import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Offers from "./pages/Offers";
import Category from "./pages/Category";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/edit-listing/:listingId" element={<EditListing />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
        <Route path="/offers" element={<Offers />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/category/:categoryName" element={<Category />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Footer /> */}
    </>
  );
};

export default App;
