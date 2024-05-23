import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the styles
import Post from './Post';
import PostSkeleton from './postSkeleton';
import { CiStickyNote } from "react-icons/ci";
import UploadForm from '../components/UploadForm'
import { useSelector,useDispatch } from 'react-redux';
import { setPosts,deletePost,updatePost,addPost } from '../redux/postSlice';
import PortfolioComponent from './PortfolioComponent';
import TradesComponent from './TradesComponent';
import WatchlistComponent from './WatchlistComponent';
const TabsComponent = ({ user, loading,anotherUser }) => {
    const {posts} = useSelector((state)=>state.posts);
    //const [posts,setPosts] = useState(user.posts);

    // const deletePost = async(postId)=>{
    //     const updatedPosts = posts.filter(post =>post._id !==postId)
    //     setPosts(updatedPosts)
    //     // state.posts = state.posts.filter(post => post._id !== action.payload)
    // }
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    return (
        <div className="flex justify-center mt-8 w-full px-2">
            <div className="w-full">
                <Tabs >
                    <TabList className="flex">
                        <Tab
                            className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                            selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                        >
                            Posts
                        </Tab>
                        <Tab
                            className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                            selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                        >
                            Trades
                        </Tab>
                        <Tab
                            className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                            selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                        >
                            Stocks
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div className="mt-4 p-1 border-t border-slate-500 rounded-md w-full">
                            {posts.length > 0 ? posts.slice().reverse().map((post, index) => (
                                <React.Fragment key={post._id}>
                                    {loading && index < 3 ? <PostSkeleton fromProfile={true} /> : <Post fromProfile={true} post={post} />}
                                </React.Fragment>
                            )) : (
                                <div className='text-center my-9' >
                                    <CiStickyNote className='mx-auto' size={40} />
                                    <h3 className='text-xl text-slate-100 mt-1' > Oops! Nothing yet?</h3>
                                    <p className='opacity-75 text-xs mt-2' >Today is the day to take a leap forward</p>
                                    <button onClick={()=>setOpen(true)}
                                        className="rounded-lg text-xs bg-primary px-3.5 py-2.5 font-semibold text-black shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-5"
                                    >
                                        Add a Post
                                    </button>
                                </div>

                            )}
                            <UploadForm open={open} setOpen={setOpen} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {anotherUser?<TradesComponent user={user._id} />:<PortfolioComponent />}
                    </TabPanel>
                    <TabPanel>
                       <WatchlistComponent />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default TabsComponent;
