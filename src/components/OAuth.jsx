import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../api/firebase";
const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // check if user exists

    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      });
    }
    navigate("/");

    try {
    } catch (error) {
      toast.error("could not authorize with google");
    }
  };
  return (
    <button
      onClick={onGoogleClick}
      className="flex items-center gap-2 border border-red-900 bg-red-900 p-3 rounded-md hover:bg-transparent duration-300  justify-center text-white"
      type="button"
    >
      Continue with <AiFillGoogleCircle className="text-2xl" />{" "}
    </button>
  );
};

export default OAuth;
