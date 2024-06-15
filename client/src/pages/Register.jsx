import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInSuccess } from "../redux/tempUserSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { changeToRegister, changeToVerification } from "../redux/condRenderSlice.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Register = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        mobile: "",
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { } = useSelector((state) => state.tempUser);
    const [formData, setFormData] = useState(initialState);
    const [validateErrors, setValidateErrors] = useState({});
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlForm = async (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {
            try {
                //dispatch(signInStart());
                setLoading(true)
                console.log(formData)
                await axios.post("/users/register", formData).then((response) => {
                    setTimeout(() => {
                        setLoading(false)
                        if (response.data.success) {
                            toast.success(response.data.message);
                            dispatch(signInSuccess(formData));
                            dispatch(changeToVerification())
                            //navigate("/verification");
                        } else {
                            toast.error(response.data.message);
                        }

                    }, 1500);
                });
            } catch (err) {
                console.log(err);
                setLoading(false)
                toast.error(err.response ? err.response.data : err.message);
            }
        }
    };
    const validate = (formDatas) => {
        const formErrors = {};
        const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
        const mobileRegex = /^(?:\+?1[ -]?)?[0-9]{10}$/;
        const passwordRegex = /^.{8,}$/;
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (formDatas.name.trim() == "") {
            formErrors.name = "Enter your Name"
        } else if (!nameRegex.test(formDatas.name)) {
            formErrors.name = "Enter a valid name"
        }

        if (formDatas.email.trim() == "") {
            formErrors.email = "Enter your Email address";
        } else if (!emailRegex.test(formDatas.email)) {
            formErrors.email = "Please enter a valid email";
        }

        if (formDatas.mobile.trim() == "") {
            formErrors.mobile = "Your mobile number"
        } else if (!mobileRegex.test(formDatas.mobile)) {
            formErrors.mobile = "Enter a valid Mob num"
        }

        if (formDatas.password.trim() == "") {
            formErrors.password = "Enter your Password";
        } else if (!passwordRegex.test(formDatas.password)) {
            formErrors.password = "Password must be at least 8 characters long";
        }
        setValidateErrors(formErrors);
        return formErrors;
    };

    return (
        <>
            <div className="flex p-2 ">
                <div className=" w-2/4 p-5">
                    <Link to='/'> <h5 className="text-primary w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
                        Paper pro
                    </h5>
                    </Link>
                </div>
            </div>
            <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
                <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5">
                    <h2 className="text-secondary text-xl font-medium">
                        Sign Up to{" "}
                        <span className="text-primary opacity-75">Paper pro</span>{" "}
                    </h2>
                    <p className="text-secondary opacity-75 text-sm mt-2">
                        Sign up to your paper trading account and practice trading with
                        virtual funds. 📈 Get hands-on experience without the risk!
                    </p>
                    <p className="text-secondary text-xs opacity-75 mt-3">
                        Already have an account?{" "}
                        <Link to='/login' ><span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
                            Sign in
                        </span></Link>
                    </p>
                </div>
                <div className=" my-auto w-full sm:w-3/5 p-5">
                    <div className="mt-1  sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
                            Register Now
                        </h1>
                        <form onSubmit={handlForm} className="space-y-6 mt-7">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-secondary"
                                    style={validateErrors.name && { color: "rgb(194 65 12)" }}
                                >
                                    {validateErrors.name
                                        ? validateErrors.name
                                        : "Your Name"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-secondary"
                                    style={validateErrors.email && { color: "rgb(194 65 12)" }}
                                >
                                    {validateErrors.email
                                        ? validateErrors.email
                                        : "Your Email address"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        placeholder="abc@gmail.com"
                                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="flex" >
                                <div className="mr-1">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium leading-6 text-secondary"
                                        style={validateErrors.mobile && { color: "rgb(194 65 12)" }}
                                    >
                                        {validateErrors.mobile
                                            ? validateErrors.mobile
                                            : "Your Mobile number"}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="number"
                                            autoComplete="mobile"
                                            onChange={handleChange}
                                            placeholder="1234567890"
                                            className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="ml-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-secondary"
                                        style={validateErrors.password && { color: "rgb(194 65 12)" }}
                                    >
                                        {validateErrors.password
                                            ? validateErrors.password
                                            : "Your Email addresss"}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            onChange={handleChange}
                                            placeholder="password"
                                            className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="pt-5">
                                {loading ? (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <ClipLoader color="black" size={19} className="mx-1 pt-1" />{" "}
                                        Loading...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Send OTP
                                    </button>
                                )}
                            </div>
                        </form>

                    </div>
                    <div className="sm:hidden text-center mt-4" >
                        <p className="text-secondary text-xs opacity-75 mt-3">
                            Already have an account?{" "}
                            <Link to='/login'><span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
                                Sign In
                            </span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
