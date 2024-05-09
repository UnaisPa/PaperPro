import { Badge } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import Header from '../components/Header'
import TradingLoader from '../components/loader/TradingLoader'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axiosInstance'
import { toast } from 'react-toastify'
import { ClipLoader, MoonLoader } from 'react-spinners'
import Axios from "axios";
import { debounce } from "lodash"
import { setProfile } from '../redux/userSlice'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const initialState = {
        name: currentUser.name,
        userName: currentUser.userName,
        bio: currentUser.bio ? currentUser.bio : '',
        password: '',
    }


    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')
    const [validateErrors, setValidateErrors] = useState({})
    const [formData, setFormData] = useState(initialState);

    const [onChangeLoader, setOnchangeLoader] = useState(false);
    const [userName, setUserName] = useState(currentUser.userName)
    const [isAvailable, setIsAvailable] = useState(true);
    const [userNameLoader, setUserNameLoader] = useState(false)
    const [imgFile, setImgFile] = useState(null)
    // const [profileImageUrl,setProfileImageUrl] = useState('')
    const fileRef = useRef()
    const handleImageClick = () => {
        fileRef.current.click()
    }

    //Upload file to cloudingary
    const uploadFile = async (file) => {

        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            // const uploadPreset = type === 'image' ? 'images_preset' : 'video_preset';
            const uploadPreset = 'images_preset'
            const resourceType = 'image'

            //const uploadedUrls = [];

            // for (const file of files) {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', uploadPreset);

            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const response = await Axios.post(api, data);
            //console.log(response)
            const { secure_url } = response.data;
            const secureImage = secure_url
            //console.log(secureImage);
            return secureImage;
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }




    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [formData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setImgFile(file)
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleUserNameInputChange = (e) => {
        const name = e.target.value;
        setUserName(name);
        checkUserNameAvailability(name);
    }

    const checkUserNameAvailability = debounce(async (userName) => {

        console.log(userName);
        //const userId = currentUser._id;
        if (userName !== currentUser.userName) {
            setUserNameLoader(true)
            await axios.get(`/users/check_username?user=${userName}`).then((response) => {
                setIsAvailable(response.data.success);
                if (response.data.success) {
                    setFormData({ ...formData, userName: userName });
                }
            }).catch((err) => {
                console.log(err)
                toast.error(err.response?.data || err.message)
            }).finally(() => {
                setUserNameLoader(false)
            })
        } else {
            setFormData({ ...formData, userName: userName });
        }


    }, 300)
    let profileImageUrl;
    const handleFormData = async (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (!isAvailable) {
            toast.error('This Username is not available!')
        }
        if (formErrors.userName) {
            toast.error('Please enter a userName using only lowercase letters, numbers, and underscores. Avoid using spaces or special characters')
        }
        if (Object.keys(formErrors).length == 0 && isAvailable) {
            setOnchangeLoader(true)
            // console.log(imgFile)
            if (imgFile) {
                console.log('helooo')

                await uploadFile(imgFile).then((imageUrl) => {
                    // setFormData(prevData => {
                    //     return { ...prevData, profilePicture: imageUrl };
                    // })
                    profileImageUrl=imageUrl
                })


            }

            //console.log(profileImageUrl)
            setOnchangeLoader(false)
            const userId = currentUser._id;
            await axios.put(`/users/edit_profile/${userId}`,{formData,profileImageUrl}).then((response) => {
                dispatch(setProfile(response.data.user));
                toast.success('Profile Updated successfullly!')
                //console.log(response.data)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response?.data || err.message)
            }).finally(() => {
                setOnchangeLoader(false)
            })
        }

    }



    const validate = (formDatas) => {
        const formErrors = {};
        const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
        const passwordRegex = /^.{8,}$/;
        const usernameRegex = /^[a-z0-9_]+$/

        if (formDatas.name.trim() == "") {
            formErrors.name = "Enter your Name"
        } else if (!nameRegex.test(formDatas.name)) {
            formErrors.name = "Enter a valid name"
        }


        if (formDatas.userName.trim() == "") {
            formErrors.userName = "Username is required"
        } else if (!usernameRegex.test(formDatas.userName)) {
            formErrors.userName = "Enter a valid Username"
            setTimeout(() => {
                formErrors.userName = null
            }, 2000)
        }

        if (formDatas.password.trim() !== "" && !passwordRegex.test(formDatas.password)) {
            formErrors.password = "Password must be at least 8 characters long";
        }
        setValidateErrors(formErrors);
        return formErrors;
    };

    return (
        <>
            {loading ? (<TradingLoader />) : <><Header />
                <div className='sm:w-4/6 mx-auto mt-10 text-slate-300'>
                    <div className="bg-[#3e4651] bg-opacity-0  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div onClick={handleImageClick} className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-16 sm:w-16">
                                {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                <Badge className="cursor-pointer " badgeContent={'Add'} color="success">
                                    {image ? (<img className='border w-16 h-16 rounded-full' src={image} />) : currentUser.profilePicture ? <img src={currentUser.profilePicture} className='border w-16 h-16 rounded-full' ></img> : <p className='text-black m-5 text-2xl font-semibold' >{currentUser.name.split("")[0]}</p>}
                                </Badge>

                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:my-auto sm:text-left">
                                <h2 className="text-xl font-semibold leading-6 text-slate-300">
                                    {currentUser.name}
                                </h2>
                                <div className="mt-0.5">
                                    <p className="text-sm text-slate-400">@{currentUser.userName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#3e4651] bg-opacity-0 px-4 py-3 sm:px-6">
                        <form onSubmit={handleFormData} >
                            <div className="w-full mb-3">
                                <input type='file' onChange={handleFileChange} accept="image/*" className='hidden' name='image' ref={fileRef} />
                                <label style={validateErrors.name && { color: "rgb(194 65 12)" }} className="block text-sm font-medium leading-6 text-slate-300">
                                    {validateErrors.name ? validateErrors.name : "Name"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="true"
                                        onChange={handleInputChange}
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        placeholder='Your name'
                                        className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                </div>
                            </div>
                            <div className="w-full mb-3">
                                <label style={validateErrors.userName ? { color: "rgb(194 65 12)" } : !isAvailable ? { color: "rgb(194 65 12)" } : {}} className="block text-sm font-medium leading-6 text-slate-300">
                                    {validateErrors.userName ? validateErrors.userName : !isAvailable ? "Username is not availabel" : "Username"}
                                </label>
                                <div className="mt-2" style={{ position: 'relative' }}>
                                    <input onChange={handleUserNameInputChange}
                                        autoComplete="true"
                                        id="userName"
                                        name="userName"
                                        value={userName}
                                        placeholder='Your Username'
                                        className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                    {userNameLoader && <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><MoonLoader color='white' size={18} /></div>}
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium leading-6 text-slate-300">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea onChange={handleInputChange}
                                        id="bio"
                                        name="bio"
                                        rows={3}
                                        value={formData.bio}
                                        placeholder='Write a few sentences about yourself.'
                                        className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                </div>
                                <div className='mt-2 ml-auto' >
                                    <Accordion className='bg-opacity-0 shadow-none' sx={{ background: 'transparent', boxShadow: 'none', padding: 0, }}>

                                        <AccordionSummary className='text-slate-400'
                                            expandIcon={<p className='text-slate-400' >Change Password <ExpandMoreIcon /></p>}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="w-full mb-3">
                                                <label style={validateErrors.password && { color: "rgb(194 65 12)" }} className="block text-sm font-medium leading-6 text-slate-300">
                                                    {validateErrors.password ? validateErrors.password : "Password"}
                                                </label>
                                                <div className="mt-2" style={{ position: 'relative' }}>
                                                    <input onChange={handleInputChange}

                                                        id="password"
                                                        autoComplete="true"
                                                        name="password"
                                                        value={formData.password}
                                                        placeholder='Your Password'
                                                        className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    {/* {onChangeLoader && <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><MoonLoader color='white' size={18} /></div>} */}
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>

                                </div>
                                <div className='w-full mt-4 sm:w-1/3 sm:ml-auto' >
                                    <button type='submit' className="rounded-md w-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm  hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {onChangeLoader ? <><ClipLoader className='mr-2' size={15} />Loading..</> : "Submit"}
                                    </button>
                                </div>
                                {/* <p className="mt-3 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p> */}
                            </div>
                        </form>
                    </div>
                </div></>}
        </>
    )
}

export default EditProfile