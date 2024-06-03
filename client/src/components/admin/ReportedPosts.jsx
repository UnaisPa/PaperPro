import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post';
import { toast } from 'react-toastify';
import axios from '../../axiosInstance';
import { setReportedPosts,deleteReportedPost } from '../../redux/adminSlice';
import { MdHourglassEmpty } from "react-icons/md";
import TradingLoader from '../loader/TradingLoader';
import ReportedPost from './ReportedPost';

const ReportedPosts = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { reportedPosts } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const loadItems = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axios.get(`/admin/get_all_reported_posts?page=${page}`);
            //setPosts(prev => [...prev, ...res.data.posts]);
            console.log(res.data.posts)
            dispatch(setReportedPosts(res.data.posts))
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
        <div>
            <InfiniteScroll
                dataLength={reportedPosts?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                
            >
                {reportedPosts.length>0? reportedPosts.map((post, index) => (
                    <React.Fragment key={post._id}>
                        {<ReportedPost fromProfile={true} reason={post.reason} createdAt={post.createdAt} postBy={post.postBy} reportedBy={post.reportedBy} post={post.post} />}
                    </React.Fragment>
                )):<div className='text-slate-400 text-center my-20' >
                    <MdHourglassEmpty size={30} className='mx-auto my-1' />
                    <h1 >No reported posts found!</h1>
                </div>}
            </InfiniteScroll>
        </div>
    )
}

export default ReportedPosts