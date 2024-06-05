import { Badge } from '@nextui-org/react'
import React, { useRef, useState } from 'react'
import { IoPersonAddOutline } from 'react-icons/io5';
import { RiAdminLine } from "react-icons/ri";
import { ClipLoader } from 'react-spinners';
import axios from '../../axiosInstance';
import { toast } from 'react-toastify';
import Axios from 'axios' 
const AdminForm = () => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        position: 'admin',
    }


    const [image, setImage] = useState('')
    const [validateErrors, setValidateErrors] = useState({})
    const [formData, setFormData] = useState(initialState);

    const [onChangeLoader, setOnchangeLoader] = useState(false);
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




    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, [formData]);

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


    const handleFormData = async (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {
            console.log(formData)
            setOnchangeLoader(true)
            // console.log(imgFile)
            let profileImageUrl;
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
            axios.post(`/admin/create_admin`,{formData,profileImageUrl}).then((response) => {
                toast.success('Admin created successfullly!')
                //console.log(response.data)
            }).catch((err) => {
                console.log(err)
                toast.error(err.response?.data?.message || err.message)
            }).finally(() => {
                setOnchangeLoader(false)
            })
        }

    }

    const validate = (formDatas) => {
        const formErrors = {};
        const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
        const passwordRegex = /^.{8,}$/;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        if (formDatas.name.trim() == "") {
            formErrors.name = "Enter your Name"
        } else if (!nameRegex.test(formDatas.name)) {
            formErrors.name = "Enter a valid name"
        }


        if (formDatas.email.trim() == "") {
            formErrors.email = "Email is required"
        } else if (!emailRegex.test(formDatas.email)) {
            formErrors.email = "Enter a valid Email"
            setTimeout(() => {
                formErrors.email = null
            }, 2000)
        }

        if (formDatas.password.trim() == "") {
            formErrors.password = "Password is required"
        } else if (!passwordRegex.test(formDatas.password)) {
            formErrors.password = "Password must be at least 8 characters long"
            setTimeout(() => {
                formErrors.password = null
            }, 2000)
        }

        setValidateErrors(formErrors);
        return formErrors;
    };

    return (
        <div>
            <div className='sm:w-4/6 mx-auto mt-10 text-slate-300'>
                <div className="bg-[#3e4651] bg-opacity-0  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div onClick={handleImageClick} className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-16 sm:w-16">
                            {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}

                            {image ? (<img className='border w-16 h-16 rounded-full' src={image} />) : <div className=' rounded-full w-20 h-20 text-black' ><IoPersonAddOutline size={18} className='mx-auto my-7' /></div>}


                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:my-auto sm:text-left">
                            <h2 className="text-xl font-semibold leading-6 text-slate-300">
                                Add new admin
                            </h2>
                            <div className="mt-0.5">
                                <p className="text-sm text-slate-400">
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
                                    placeholder='Admin name'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>

                        <div className="w-full mb-3">
                            <label style={validateErrors.email && { color: "rgb(194 65 12)" }} className="block text-sm font-medium leading-6 text-slate-300">
                                {validateErrors.email ? validateErrors.email : "Email"}
                            </label>
                            <div className="mt-2">
                                <input onChange={handleInputChange}
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder='Enter email'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                        <div className="w-full mb-3">
                        <label style={validateErrors.password && { color: "rgb(194 65 12)" }} className="block text-sm font-medium leading-6 text-slate-300">
                                {validateErrors.password ? validateErrors.password : "Password"}
                            </label>
                            <div className="mt-2">
                                <input onChange={handleInputChange}
                                    id="password"
                                    value={formData.password}
                                    name="password"
                                    placeholder='Enter Password'
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                        <div className="w-full mb-3">
                            <label className="block text-sm font-medium leading-6 text-slate-300">
                                Admin Position
                            </label>
                            <div className="mt-2">
                                <select onChange={handleInputChange}
                                    id="position"
                                    name="position"
                                    className="block bg-transparent outline-none p-2 w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                >
                                    <option value='admin'> Admin</option>
                                    <option value='superAdmin'> Super Admin</option>
                                </select>
                            </div>
                        </div>
                    <button disabled={onChangeLoader} className=' my-3 px-3 py-2 text-black bg-primary text-sm font-semibold hover:bg-opacity-90 rounded-md' type='submit'>{onChangeLoader?<><ClipLoader className='mr-2' size={15} />Loading..</>:"SUBMIT DETAILS"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminForm