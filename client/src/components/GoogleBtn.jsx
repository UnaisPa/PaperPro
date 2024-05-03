import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import app from "../firebase";
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInStart,signInFailure } from "../redux/userSlice.js";
import { toast } from "react-toastify";

const GoogleBtn = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const handleGoogleBtn = async (e) => {
    e.preventDefault();
    try {
      //dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await axios.post(
        "/users/google_auth",
        {
          name: result.user.displayName,
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setTimeout(() => {
        toast.success("Login Success");
        console.log(response.data)
        dispatch(signInSuccess(response.data.user));
        localStorage.setItem("jwt", response.data.token);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
      dispatch(signInFailure());
      toast.error(err.message);
    }
  };
  return (
    // <button onClick={handleGoogleBtn} type='button' className=' w-full my-3 rounded-md bg-red-500 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >
    //     <GoogleIcon className='' fontSize='medium' /> Continue with Google
    // </button>
    <>
      {loading ? (
        <FcGoogle
          onClick={handleGoogleBtn}
          size={27}
          className="mx-auto animate-spin cursor-pointer"
        />
      ) : (
        <FcGoogle
          onClick={handleGoogleBtn}
          size={27}
          className="mx-auto cursor-pointer"
        />
      )}
    </>
  );
};

export default GoogleBtn;
