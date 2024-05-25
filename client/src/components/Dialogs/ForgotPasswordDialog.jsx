import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import { IoLockClosedOutline } from "react-icons/io5";
import axios from "../../axiosInstance"
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { RiStockLine } from "react-icons/ri";
export default function ForgotPasswordDialog({ setDialogOpen, userId }) {
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null);
    const [email, setEmail] = useState('');
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [emailErr, setEmailErr] = useState('')
    const [otpFormDisplay, setOtpFormDisplay] = useState(false);
    const [otp, setOtp] = useState(123456)
    const sentOtp = () => {
        if (email.trim() == '') {
            setEmailErr('Please enter your email!');
        } else if (!emailRegex.test(email)) {
            setEmailErr('Please provide your valid email!')
        } else {
            axios.post('/users/resend_otp', { from: true, email: email }).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    setOtpFormDisplay(true)
                } else {
                    toast.error(response.data.message);
                }
            })
            console.log(email)
        }
    }

    const [verified, setVerified] = useState(false)
    const verifyOtp = () => {
        if (otp !== 123456) {
            axios.post('/users/verify_otp_forgotpassword', { email, otp }).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setVerified(true)
                    toast.success(response.data.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const changePassword = () => {
        const passwordRegex = /^.{8,}$/;
        if (password.trim() == '') {
            setPasswordErr('Please Enter password')
        } else if (!passwordRegex.test(password)) {
            setPasswordErr('Password should be contain atleast 8 chars')
        } else {
            console.log(password)
            axios.put(`/users/update_password/${userId}`, { password: password }).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog className="relative z-10 " initialFocus={cancelButtonRef} onClose={() => setDialogOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel style={{ 'fontFamily': '"Poppins", sans-serif' }} className="relative transform overflow-hidden w-full rounded-lg bg-[#3e4651] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-[#3e4651] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                            <IoLockClosedOutline color='black' size={22} />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-slate-300">
                                                Forgot Password?
                                            </Dialog.Title>
                                            <div className="mt-5">
                                                {verified ? <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-sm  leading-6 text-slate-400"
                                                    // style={validateErrors.email && { color: "rgb(194 65 12)" }}
                                                    >
                                                        {
                                                            passwordErr
                                                                ? passwordErr
                                                                : "Enter your new password."}
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="New password"
                                                            className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div> : !otpFormDisplay ? <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm  leading-6 text-slate-400"
                                                    // style={validateErrors.email && { color: "rgb(194 65 12)" }}
                                                    >
                                                        {
                                                            emailErr
                                                                ? emailErr
                                                                : "Please enter your email address, and we will send you the OTP to change the password."}
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="abc@gmail.com"
                                                            className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div> : <div>
                                                    <label
                                                        htmlFor="otp"
                                                        className="block text-sm  leading-6 text-slate-400"
                                                    >
                                                        Please Enter 6 Digit OTP
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="otp"
                                                            name="otp"
                                                            type="number"
                                                            onChange={(e) => setOtp(e.target.value)}
                                                            placeholder="012345"
                                                            className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#3e4651] px-4 py-3 sm:flex w-full sm:px-6 ">

                                    {verified?<button
                                        type="button"
                                        className="mt-3  w-full bg-gray-500 text-slate-900 font-semibold rounded-md py-2"
                                        onClick={changePassword}

                                    >
                                        UPDATE PASSWORD
                                    </button> :!otpFormDisplay ? <button
                                        type="button"
                                        className="mt-3  w-full bg-gray-500 text-slate-900 font-semibold rounded-md py-2"
                                        onClick={sentOtp}

                                    >
                                        SENT OTP
                                    </button> : <button
                                        type="button"
                                        className="mt-3  w-full bg-gray-500 text-slate-900 font-semibold rounded-md py-2"
                                        onClick={verifyOtp}

                                    >
                                        VERIFY OTP
                                    </button>}
                                </div>
                                <div className="bg-[#3e4651] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md opacity-60 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm sm:mt-0 sm:w-auto"
                                        onClick={() => { setOpen(false), setDialogOpen(false) }}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
