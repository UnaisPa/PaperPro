import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "../axios.js";
import { toast } from 'react-toastify';
import PostSkeleton from '../components/postSkeleton';
import { MoonLoader } from 'react-spinners';
import TradingLoader from '../components/loader/TradingLoader.jsx';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post.jsx';

const SavedPosts = () => {
    const navigate = useNavigate()
    const [savedPosts, setSavedPosts] = useState([])
    const { currentUser } = useSelector((state) => state.user);

    const getSavedPosts = async () => {

        const userId = currentUser._id;
        await axios.get(`/post/saved_posts/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response) => {
            //console.log()
            setSavedPosts(response.data.posts);
        }).catch((err) => {
            toast.error(err.response?.data || err.message);
        })
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSavedPosts()
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleBack = () =>{
        navigate('/profile')
    }

    

    return (
        <>
            {loading ? (
                <TradingLoader />
            ) : (
                <>
                    <Header />
                    <section>
                        <div className='sm:w-4/6 mx-auto mt-10 text-slate-300'>
                            <div className='flex mx-5'>
                                <IoIosArrowRoundBack onClick={handleBack} className='hover:text-slate-100 cursor-pointer size-12' />
                                <div className='py-2'><h2 className='text-2xl px-3'>Saved Posts</h2></div>
                            </div>
                        </div>
                        {savedPosts && savedPosts.length > 0 ? (
                            savedPosts.map((post, index) => (
                                <React.Fragment key={post._id}>
                                    {loading && index < 3 ? <PostSkeleton /> : <Post post={post} savedPosts={savedPosts} setSavedPosts={setSavedPosts} fromSavedPosts={true} />}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className='my-auto align-middle'>
                                <img src='/images/cloud.png' className='w-32 mt-10 mx-auto h-32' />
                                <h1 className='text-center text-xl text-slate-200'>It's empty over here</h1>
                                <p className='text-center text-sm mt-1 text-slate-300'>Add your favourite posts.</p>
                            </div>
                        )}
                    </section>
                </>
            )}
        </>
    );
}

export default SavedPosts