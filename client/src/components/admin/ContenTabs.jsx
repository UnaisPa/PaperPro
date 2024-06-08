import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the styles
import Post from '../Post';
import PostSkeleton from '../PostSkeleton';
import { CiStickyNote } from "react-icons/ci";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../../axiosInstance';
import { toast } from 'react-toastify';
import { setPosts,deletePost } from '../../redux/adminSlice';
import { useDispatch,useSelector } from 'react-redux';
import ReportedPosts from './ReportedPosts';
import TradingLoader from '../loader/TradingLoader';
const ContentTabs = () => {

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {posts} = useSelector((state)=>state.admin);
    const dispatch = useDispatch();

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
                    <TabPanel>
                        <div>
                            <InfiniteScroll
                                dataLength={posts?.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<TradingLoader />}
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
                        <ReportedPosts />
                    </TabPanel>
                    
                </Tabs>
            </div>
        </div>
    );
};

export default ContentTabs;
