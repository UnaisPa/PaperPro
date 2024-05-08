import { Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import Header from '../components/Header'
import TradingLoader from '../components/loader/TradingLoader'

const EditProfile = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (<TradingLoader />) : <><Header />
                <div className='sm:w-4/6 mx-auto mt-10 text-slate-300'>
                    <div className="bg-[#3e4651] bg-opacity-0  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-16 sm:w-16">
                                {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                <Badge anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} className="cursor-pointer" badgeContent={<IoMdAdd />} color="success">
                                    <div className='w-10 h-10 rounded-full' ></div>
                                </Badge>

                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:my-auto sm:text-left">
                                <h2 className="text-xl font-semibold leading-6 text-slate-300">
                                    Unais Muhammed
                                </h2>
                                <div className="mt-0.5">
                                    <p className="text-sm text-slate-400">@unais321
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#3e4651] bg-opacity-0 px-4 py-3 sm:px-6">
                        <div className="w-full mb-3">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-slate-300">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    value='Hamk'
                                    placeholder='Your name'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="w-full mb-3">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-slate-300">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    value='@unais32'
                                    placeholder='Your Username'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-slate-300">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    value='The content you should change.'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <div className='w-full mt-4 sm:w-1/3 sm:ml-auto' >
                                <button className="rounded-md w-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm  hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                            {/* <p className="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p> */}
                        </div>
                    </div>
                </div></>}
        </>
    )
}

export default EditProfile