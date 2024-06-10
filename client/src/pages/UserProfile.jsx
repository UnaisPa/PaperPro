import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "../axiosInstance.js"
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom"
import TabsComponent from '../components/Tabs.jsx';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/userSlice.js';
import { setPosts } from '../redux/postSlice.js';
import { MoonLoader, ScaleLoader } from 'react-spinners';
import { RiUserFollowLine } from "react-icons/ri"
import { useSelector } from 'react-redux';
import TailwindDialog from '../components/TailwindDialog.jsx';
import { updateFollowList } from '../redux/userSlice.js';
import { setUserIdForGettingTrades } from '../redux/userSlice.js';
import { setChatBox,setCurrentChatId,setCurrentReciever } from '../redux/chatSlice.js';

const UserProfile = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
     const { currentUser } = useSelector((state) => state.user);
     const {posts} = useSelector((state)=>state.posts);
    
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [checkAlreadyFollow,setCheckAlreadyFollow] = useState(false)
    const [OpendDialog,setOpendDialog] = useState(false);
    const navigate = useNavigate()
    
    useEffect(()=>{
        
        getUserProfile()
        
        const check = checkAlreadyFollowing()
        setCheckAlreadyFollow(check);
    },[])
  
    
    //get User Profile
    const getUserProfile = async () => {
        const userId = id
        setLoading(true);
        axios.get(`/users/profile?userId=${userId}`).then((response) => {
            //dispatch(setProfile(response.data.user));
            setUser(response.data.user);
            dispatch(setPosts(response.data.user.posts));
            dispatch(setUserIdForGettingTrades(response.data.user._id))
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
        const action = 'follow'
        // console.log(currentUserId);
        // console.log(userId);
        axios.put('/users/update_follow_list',{currentUserId,userId,action}).then((response)=>{
            dispatch(updateFollowList(userId))
            //const updatedUser = user.followers.push(currentUserId)
            const updatedUser = { ...user, followers: [...user.followers, currentUserId] };
            setUser(updatedUser);
            console.log(updatedUser);
            //setUser()
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

    const [chatLoading,setChatLoading] = useState(false);
    const handleChat = () =>{
        setChatLoading(true)
        axios.post('/chat/create_chat',{userId:currentUser._id,otherUserId:id}).then((response)=>{
            console.log(response.data.chatId);
            dispatch(setCurrentChatId(response.data.chatId));
            dispatch(setCurrentReciever(user));
            navigate('/chat')
        }).catch((err)=>{
            toast.error(err.response?.data?.message);
        }).finally(()=>{
            setChatLoading(false);
        })
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
                            <p className='opacity-75' >{user.userName}</p>
                            <div className='mt-6' >
                                <h4>About</h4>
                                <p className='text-sm mt-1 opacity-80' > {user.bio}</p>
                            </div>
                            <div className=' mt-3 flex text-slate-300'>
                                {checkAlreadyFollow?<button onClick={()=>setOpendDialog(true)}
                                    className="rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2 hover:text-blue-200  text-blue-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                    <RiUserFollowLine  size={13} className='mr-2' /> Following
                                </button>:<button onClick={handleFollowBtn}
                                    className=" rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2 hover:text-blue-200  text-blue-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                     Follow
                                </button>}
                                <button onClick={()=>!chatLoading&&handleChat()}
                                    className=" rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2 hover:text-blue-200  text-blue-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                    {chatLoading?<><MoonLoader size={12} color='white' className='mr-1' /> Loading </>: "Chat"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=' hidden lg:block w-1/2'>
                        <h1 className='text-6xl text- font-bold my-6 opacity-10' >PLAN YOUR TRADE AND TRADE YOUR PLAN.</h1>
                    </div>
                </div>
                {OpendDialog&&<TailwindDialog setCheckAlreadyFollow={setCheckAlreadyFollow} user={user} setUser={setUser} type={'unfollow'} title={'Unfollow Account'}  description={`Are you sure you want to unfollow ${user.name} !`} setOpendDialog={setOpendDialog} />}
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300'>

                    <TabsComponent anotherUser={user._id} loading={loading} user={user} />
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