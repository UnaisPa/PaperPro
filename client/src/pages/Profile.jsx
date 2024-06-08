import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from "../axiosInstance.js"
import { toast } from "react-toastify";
import { useNavigate , useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/userSlice.js';
import TabsComponent from '../components/Tabs.jsx';
import { LuClipboardEdit } from "react-icons/lu";
import { CiSaveDown1 } from "react-icons/ci";
import { setPosts } from '../redux/postSlice.js';
import { FiLogOut } from "react-icons/fi";
import { setUserIdForGettingTrades } from '../redux/userSlice.js';
import LogoutDialog from '../components/dialogs/LogoutDialog.jsx';
// import { setCompletedTrades } from '../redux/completedTradesSlice.js';
import TradeAnalysis from '../components/TradeAnalytics.jsx';
import PortfolioPerformanceGraph from '../components/performanceChart.jsx';
const Profile = () => {
    const [completedTrades,setCompletedTrades] = useState([])
    const { currentUser } = useSelector((state) => state.user);
    const {posts} = useSelector((state)=>state.posts)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
 

    const [openDialog,setOpenDialog] = useState(false)

    useEffect(() => {
        getUserProfile()
        
    }, [])

    
    //get User Profile - my profile
    const getUserProfile = async () => {
        const userId = currentUser._id
        setLoading(true);
        axios.get(`/users/profile?userId=${userId}`).then((response) => {
            dispatch(setProfile(response.data.user));
            dispatch(setPosts(response.data.user.posts))
            dispatch(setUserIdForGettingTrades(response.data.user._id))
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.message || err.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        getPastTrades()
    }, [])

    const getPastTrades = async () => {
        const userId = currentUser._id
        axios.get(`/portfolio/get_past_trades/${userId}`).then((response) => {
            console.log(response.data);
            setCompletedTrades(response.data.trades)
            //dispatch(setCompletedTrades(response.data.trades));
        }).catch((err) => {
            console.log(err);
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
                                {currentUser?.profilePicture ? <img className="w-20 h-20 rounded-full" src={currentUser.profilePicture} /> : <div className=" bg-primary w-20 h-20 rounded-full text-center text-black text-3xl pt-5 font-semibold">{currentUser.name.split('')[0].toUpperCase()}</div>}

                            </div>
                            <div className='mt-3  text-center' >
                                <h5 >Posts</h5>
                                <h6 className='font-bold'>{posts.length}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Followers</h5>
                                <h6 className='font-bold'>{currentUser.followers.length}</h6>
                            </div>
                            <div className='mt-3  text-center' >
                                <h5 className=''>Following</h5>
                                <h6 className='font-bold'>{currentUser.following.length}</h6>
                            </div>
                        </div>
                        <div className='m-5' >
                            <h1 className='text-xl font-semibold' >{currentUser.name}</h1>
                            <p className='opacity-75' >@{currentUser.userName}</p>
                            <div className='mt-6' >
                                {currentUser.bio&&<h4>About</h4>}
                                <p className='text-sm mt-1 opacity-80' > {currentUser.bio?currentUser.bio:''}</p>
                            </div>
                            <div className=' mt-3 flex text-slate-300'>
                                <button onClick={()=>navigate('/edit_profile')}
                                    className="rounded-lg flex text-xs border border-slate-400 mr-3  px-3.5 py-2.5 hover:text-slate-50  text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                    <LuClipboardEdit size={13} className='mr-2' /> Edit Profile
                                </button>
                                
                                <button onClick={()=>navigate('/saved_posts')}
                                    className="rounded-lg flex text-xs border border-slate-400 px-3.5 py-2.5 hover:text-slate-50   text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                   <CiSaveDown1 size={16} className='mr-2' /> Saved Posts
                                </button>
                                <button onClick={()=>setOpenDialog(true)}
                                    className="rounded-lg flex text-xs border border-slate-400 ml-3 px-3.5 py-2.5 hover:text-red-300   text-slate-300 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5">
                                   <FiLogOut size={16} className='mr-2' /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=' hidden lg:block w-1/2'>
                        {completedTrades&&<PortfolioPerformanceGraph tradingData={completedTrades} />}
                    </div>
                </div>
                
                <div className=' sm:w-4/6 mx-auto mt-10 flex text-slate-300'>

                    <TabsComponent loading={loading} />
                </div>
            </section>
            {openDialog&&<LogoutDialog setOpenDialog={setOpenDialog} />}
        </div>
    )
}

export default Profile