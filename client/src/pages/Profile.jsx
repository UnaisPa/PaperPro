import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "../axios.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/userSlice.js';
import TabsComponent from '../components/Tabs.jsx';
import { LuClipboardEdit } from "react-icons/lu";
import { CiSaveDown1 } from "react-icons/ci";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        console.log(token)
        axios.post('/users/logout', null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }, { withCredentials: true }).then((response) => {
            toast.success(response.data.message)
            console.log(response.data)
            localStorage.removeItem('jwt');
            localStorage.removeItem('root');
            window.location.href = '/'
        }).catch((err) => {
            console.log(err.response ? err.response.data : err.message);
            toast.error(err.response ? err.response.data.message : err.message);
        })

    }

    useEffect(() => {
        getUserProfile()
    }, [])

    //get User Profile
    const getUserProfile = async () => {
        const userId = currentUser._id
        setLoading(true);
        await axios.get(`/users/profile?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response) => {
            dispatch(setProfile(response.data.user));
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
            //toast.error(err.response.message || err.message);
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <div>
            <Header />
            <section>
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300' >
                    <div className=' w-full lg:w-2/3'>
                        <div className='flex m-5 gap-x-8 sm:gap-x-12' >
                            <div className='w-20 h-20 rounded-full border' >
                                {currentUser.profilePicture ? <img className="w-20 h-20 rounded-full" src={currentUser.profilePicture} /> : <div className=" bg-primary w-20 h-20 rounded-full text-center text-black text-3xl pt-5 font-semibold">{currentUser.name.split('')[0].toUpperCase()}</div>}

                            </div>
                            <div className='mt-3  text-center' >
                                <h5 >Posts</h5>
                                <h6 className='font-bold'>{currentUser.posts.length}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Followers</h5>
                                <h6 className='font-bold'>{currentUser.followers}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Following</h5>
                                <h6 className='font-bold'>{currentUser.following}</h6>
                            </div>
                        </div>
                        <div className='m-5' >
                            <h1 className='text-xl font-semibold' >{currentUser.name}</h1>
                            <p className='opacity-75' >Beginner</p>
                            <div className='mt-6' >
                                <h4>About</h4>
                                <p className='text-sm mt-1 opacity-80' > you can use the scrollbar variants in your CSS. However, it's important to note that this feature is experimental and may not work perfectly in all browsers. Here's how you can style the default scrollbar with Tailwind CSS</p>
                            </div>
                            <div className=' mt-3 flex text-slate-300'>
                                <button
                                    className="rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2.5 hover:text-slate-50  text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                    <LuClipboardEdit size={13} className='mr-2' /> Edit Profile
                                </button>
                                <button
                                    className="rounded-lg flex text-xs border border-slate-400 px-3.5 py-2.5 hover:text-slate-50   text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                   <CiSaveDown1 size={16} className='mr-2' /> Saved Posts
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='border hidden lg:block w-1/2'>

                    </div>
                </div>
                
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300'>

                    <TabsComponent loading={loading} user={currentUser} />
                </div>
            </section>
            <button className='border text-white' onClick={handleLogout} >
                Logout
            </button>
        </div>
    )
}

export default Profile