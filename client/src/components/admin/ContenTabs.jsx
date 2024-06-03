import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the styles
import Post from '../Post';
import PostSkeleton from '../postSkeleton';
import { CiStickyNote } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../../axiosInstance';
import { toast } from 'react-toastify';
import { setPosts,deletePost } from '../../redux/adminSlice';
import { useDispatch,useSelector } from 'react-redux';
const ContentTabs = () => {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {posts} = useSelector((state)=>state.admin);
    const dispatch = useDispatch();
    //const [posts, setPosts] = useState([])

    // const getAllPosts = () => {
    //     setLoading(true)
    //     axios.get(`/admin/get_all_posts?page=${page}`).then((response) => {
    //         setPosts(response.data.posts);
    //     }).catch((err) => {
    //         toast.error(err.response?.data?.message);
    //         console.log(err)
    //     }).finally(() => {
    //         setLoading(false)
    //     })
    // }

    // useEffect(() => {
    //      getAllPosts()
    // }, [page])
    const loadItems = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axios.get(`/admin/get_all_posts?page=${page}`);
            //setPosts(prev => [...prev, ...res.data.posts]);
            console.log(posts)
            dispatch(setPosts(res.data.posts))
            if (res.data.posts.length === 0) {
                setHasMore(false);
            }
        } catch (err) {
            toast.error(err.response?.data?.message)
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, [page]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

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
                            Reported Posts
                        </Tab>
                        
                    </TabList>
                    {/* <TabPanel>
                        <div className="mt-4 p-1 border-t border-slate-500 rounded-md w-full">
                            {posts?.length > 0 ? posts.map((post, index) => (
                                <React.Fragment key={post._id}>
                                    {loading && index < 3 ? <PostSkeleton /> : <Post post={post} />}
                                </React.Fragment>
                            )) : (
                                <div className='text-center my-9' >
                                    <CiStickyNote className='mx-auto' size={40} />
                                    <h3 className='text-xl text-slate-100 mt-1' > Oops! Nothing yet?</h3>
                                </div>
                            )}
                        </div>
                    </TabPanel> */}
                    <TabPanel>
                        <div>
                            <InfiniteScroll
                                dataLength={posts?.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h4>Loading...</h4>}
                                endMessage={<p className='text-center text-slate-400 my-4' >No more items to display</p>}
                            >
                                {posts.map((post, index) => (
                                    <React.Fragment key={post._id}>
                                        { <Post fromProfile={true} post={post} />}
                                    </React.Fragment>
                                ))}
                            </InfiniteScroll>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>Reported Posts</div>
                    </TabPanel>
                    
                </Tabs>
            </div>
        </div>
    );
};

export default ContentTabs;
