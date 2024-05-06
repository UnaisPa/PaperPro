import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "../axios.js"
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"
import TabsComponent from '../components/Tabs.jsx';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/userSlice.js';
import { MoonLoader, ScaleLoader } from 'react-spinners';
import { RiUserFollowLine } from "react-icons/ri"
import { useSelector } from 'react-redux';
import TailwindDialog from '../components/TailwindDialog.jsx';

const UserProfile = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
     const { currentUser } = useSelector((state) => state.user);
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [checkAlreadyFollow,setCheckAlreadyFollow] = useState(false)
    const [OpendDialog,setOpendDialog] = useState(false);

    
    useEffect(()=>{
        getUserProfile()
        const check = checkAlreadyFollowing()
        setCheckAlreadyFollow(check);
    },[])
  
    
    //get User Profile
    const getUserProfile = async () => {
        const userId = id
        setLoading(true);
        await axios.get(`/users/profile?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response) => {
            //dispatch(setProfile(response.data.user));
            setUser(response.data.user);
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.message || err.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    const handleFollowBtn = async() =>{
        const currentUserId = currentUser._id;
        const userId = id

        // console.log(currentUserId);
        // console.log(userId);
        await axios.put('/users/update_follow_list',{currentUserId,userId},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response)=>{
            //dispatch(updateFollowList(userId))
            setCheckAlreadyFollow(true);
            toast.success(`Now you are following ${user.name}`)
            //console.log(response.data);
        }).catch((err)=>{
            toast.error(err.message)
            console.log(err)
        })
    }    
    

    //Checking user is already following !
    const checkAlreadyFollowing = ()=>{
        const userId = id
        const currentUserId = currentUser._id
        if(userId===currentUserId){
            return true
        }

        const alreadyFollowing = currentUser.following.filter((user)=>{
            return user === userId
        })
        //console.log(alreadyFollowing);
        if(alreadyFollowing[0]){
            //console.log(true)
            return true
        }else{
            return false
        } 
    }


    //console.log(user)
    return (
        <div>
            <Header />
            {user?<section>
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300' >
                    <div className=' w-full lg:w-2/3'>
                        <div className='flex m-5 gap-x-8 sm:gap-x-12' >
                            <div className='w-20 h-20 rounded-full border' >
                                {user.profilePicture? <img className="w-20 h-20 rounded-full" src={user.profilePicture} /> : <div className=" bg-primary w-20 h-20 rounded-full text-center text-black text-3xl pt-5 font-semibold">{user.name.split('')[0].toUpperCase()}</div>}

                            </div>
                            <div className='mt-3  text-center' >
                                <h5 >Posts</h5>
                                <h6 className='font-bold'>{user.posts.length}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Followers</h5>
                                <h6 className='font-bold'>{user.followers.length}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Following</h5>
                                <h6 className='font-bold'>{user.following.length}</h6>
                            </div>
                        </div>
                        <div className='m-5' >
                            <h1 className='text-xl font-semibold' >{user.name}</h1>
                            <p className='opacity-75' >Beginner</p>
                            <div className='mt-6' >
                                <h4>About</h4>
                                <p className='text-sm mt-1 opacity-80' > you can use the scrollbar variants in your CSS. However, it's important to note that this feature is experimental and may not work perfectly in all browsers. Here's how you can style the default scrollbar with Tailwind CSS</p>
                            </div>
                            <div className=' mt-3 flex text-slate-300'>
                                {checkAlreadyFollow?<button onClick={()=>setOpendDialog(true)}
                                    className="rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2 hover:text-blue-200  text-blue-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                    <RiUserFollowLine size={13} className='mr-2' /> Following
                                </button>:<button onClick={handleFollowBtn}
                                    className=" rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2 hover:text-blue-200  text-blue-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                     Follow
                                </button>}
                                {/* <button
                                    className="rounded-lg flex text-xs border border-slate-400 px-3.5 py-2.5 hover:text-slate-50   text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                   <CiSaveDown1 size={16} className='mr-2' /> Saved Posts
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className='border hidden lg:block w-1/2'>

                    </div>
                </div>
                {OpendDialog&&<TailwindDialog user={user.name} setOpendDialog={setOpendDialog} />}
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300'>

                    <TabsComponent loading={loading} user={user} />
                </div>
            </section>:
            <div className='flex justify-center align-middle pt-48' >
                <MoonLoader color='#36d7b7'/>
            </div>}
            {/* <button className='border text-white' >
                Logout
            </button> */}
        </div>
    )
}

export default UserProfile