import React, { useState, useEffect } from "react";
import { adminSignInSuccess } from "../../redux/adminSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, } from "react-router-dom";
// import axios from "../axios.js";
import axios from "../../axios.js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { signInSuccess } from "../../redux/userSlice.js";
// import { changeToRegister,changeToVerification } from "../redux/condRenderSlice.js";
const AdminLogin = () => {

    const initialState = {
        email: "",
        password: "",
    };

    useEffect(() => {
        // dispatch(changeToRegister())
    }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { loading } = useSelector((state) => state.user);
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [validateErrors, setValidateErrors] = useState({});
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlForm = async (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {
            setLoading(true)
            console.log(formData);
            try {
                // dispatch(signInStart());
                await axios.post("/admin/auth", formData).then((response) => {
                    if (response.data.admin) {
                        console.log(response.data)
                        setTimeout(() => {
                            toast.success("Login Success");
                            dispatch(signInSuccess(response.data.admin));
                            localStorage.setItem('jwt', response.data.token);
                            //localStorage.setItem('refreshToken',response.data.refreshToken)
                            navigate('/admin/dashboard')
                        }, 1500);
                    }else{
                        toast.error(response.data.message);
                        console.log(response.data)
                    }
                });
            } catch (err) {
                console.log(err);
                toast.error(err.response ? err.response.data : err.message);
            } finally{
                setLoading(false)
            }
        }
    };
    const validate = (formDatas) => {
        const formErrors = {};
        const passwordRegex = /^.{8,}$/;
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (formDatas.email.trim() == "") {
            formErrors.email = "Enter your Email address";
        } else if (!emailRegex.test(formDatas.email)) {
            formErrors.email = "Please enter a valid email";
        }

        if (formDatas.password.trim() == "") {
            formErrors.password = "Please enter your Password";
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
                    <Link to='/'><h5 className="text-primary w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
                        Paper pro <span className="text-xs" >Admin</span>
                    </h5></Link>
                </div>
            </div>
            <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
                <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5">
                    <h2 className="text-secondary text-xl font-medium">
                        Sign In to{" "}
                        <span className="text-primary opacity-75">Paper pro <span className="text-xs">Admin</span></span>{" "}
                    </h2>
                    <p className="text-secondary opacity-75 text-sm mt-2">
                        This is only for verified admins!
                    </p>

                </div>
                <div className=" my-auto w-full sm:w-3/5 p-5">
                    <div className="mt-1  sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
                            Admin Sign In
                        </h1>
                        <form onSubmit={handlForm} className="space-y-6 mt-7">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-secondary"
                                    style={validateErrors.email && { color: "rgb(194 65 12)" }}
                                >
                                    {validateErrors.email
                                        ? validateErrors.email
                                        : "Your Email addresss"}
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

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-secondary"
                                        style={
                                            validateErrors.password && { color: "rgb(194 65 12)" }
                                        }
                                    >
                                        {validateErrors.password
                                            ? validateErrors.password
                                            : "Password"}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                    />
                                </div>
                                <div className="text-xs m-3 float-right ">
                                    <a href="#" className=" text-gray-500 hover:text-gray-400">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-2">
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
                                        Sign in
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
