import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import Spinner from "../components/Spinner";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
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
    images: {},
    latitude: 0,
    longitude: 0,
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
    images,
  } = formData;

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({
          ...docSnap.data(),
        });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("listing does not exits");
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [listing, navigate]);

  const onChangeHandler = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  async function onSubmitHandler(e) {
    e.preventDefault();
    setLoading(true);
    if (+discount >= +price) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;

    const docRef = doc(db, "listings", params.listingId);

    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("changes has been applied");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="py-10  h-full flex flex-col items-center gap-5">
      <h1 className="text-3xl  font-bold text-center">Edit Listing</h1>
      <form
        onSubmit={onSubmitHandler}
        className="my-10 flex flex-col min-w-[300px]  gap-5"
      >
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Sale / Rent</p>
          <div className="flex w-full  justify-between">
            <button
              type="button"
              id="type"
              value={"sale"}
              onClick={onChangeHandler}
              className={` border border-black rounded-full ${
                type === "sale"
                  ? "bg-blue-700 text-white"
                  : "  bg-white text-black"
              } py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Sale
            </button>
            <button
              id="type"
              value={"rent"}
              onClick={onChangeHandler}
              type="button"
              className={` border border-black rounded-full ${
                type === "rent"
                  ? "bg-blue-700 text-white"
                  : "bg-white text-black"
              } py-2 px-4 rounded-sm min-w-[135px]`}
            >
              Rent
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold">Name</p>
          <input
            id="name"
            value={name}
            name="address"
            className="rounded-md w-full text-black"
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="flex w-full justify-between gap-4">
          <div>
            <p>Beds</p>
            <input
              id="beds"
              type="number"
              className="max-w-[135px] text-black text-center"
              value={beds}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <p>Baths</p>
            <input
              id="baths"
              type="number"
              className=" text-center max-w-[135px] text-black"
              value={baths}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Parking spot</p>
          <div className="flex w-full  justify-between">
            <button
              id="parking"
              onClick={onChangeHandler}
              type="button"
              value={"true"}
              className={`border border-black rounded-full ${
                parking ? "bg-blue-700 text-white" : " bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes
            </button>
            <button
              id="parking"
              onClick={onChangeHandler}
              type="button"
              value={"false"}
              className={`border border-black rounded-full ${
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
              id="furnished"
              onClick={onChangeHandler}
              type="button"
              value={"true"}
              className={`border border-black rounded-full ${
                furnished ? "bg-blue-700 text-white" : "bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes{" "}
            </button>
            <button
              id="furnished"
              type="button"
              value={"false"}
              onClick={onChangeHandler}
              className={`border border-black rounded-full ${
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
            id="address"
            className="rounded-md w-full text-black"
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold">Description</p>
          <textarea
            value={description}
            className="rounded-md w-full text-black"
            id="description"
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <div className="flex items-start flex-col gap-3">
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex w-full  justify-between">
            <button
              id="offer"
              onClick={onChangeHandler}
              type="button"
              value={true}
              className={`border border-black rounded-full ${
                offer ? "bg-blue-700 text-white" : " bg-white text-black"
              }  py-2 px-4 min-w-[135px] rounded-sm`}
            >
              Yes
            </button>
            <button
              id="offer"
              onClick={onChangeHandler}
              type="button"
              value={false}
              className={`border border-black rounded-full ${
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
                id="price"
                value={price}
                onChange={onChangeHandler}
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
              id="discount"
              value={discount}
              onChange={onChangeHandler}
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
            onChange={onChangeHandler}
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white w-full py-3 rounded-md hover:opacity-80 mt-6 active:opacity-60 duration-300"
        >
          Apply changes{" "}
        </button>
      </form>
    </div>
  );
};

export default EditListing;
