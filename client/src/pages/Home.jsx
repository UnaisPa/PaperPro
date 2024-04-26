import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Post from '../components/Post'
import UploadForm from '../components/UploadForm'
import axios from "../axios"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { setPosts, addPost, updatePost, deletePost } from '../redux/postSlice'
import PostSkeleton from '../components/postSkeleton'

const Home = () => {
    const MemoizedPost = React.memo(Post);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllPosts();
        //console.log(page)
    }, [page])



    const getAllPosts = async () => {
        setLoading(true);
        await axios.get(`/post/get_all_posts?page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response) => {
            dispatch(setPosts(response.data.posts))
            setCount(response.data.count);
            //console.log(response.data)
        }).catch((err) => {
            console.log(err.response ? err.response.data : err.message);
            toast.error(err.response ? err.response.data.message : err.message)
        }).finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }

    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Header />
            <section>
                <div className=' w-full mt-10' >
                    <div onClick={() => setOpen(true)} className='md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 h-12 mx-auto cursor-pointer bg-[#4C525E] hover:opacity-85' >
                        <p className='text-secondary py-4 pl-4'> What's your view on market today</p>
                    </div>
                    <UploadForm open={open} setOpen={setOpen} />

                    {posts.map((post, index) => (
                        <React.Fragment key={post._id}>
                            {loading && index < 3 ? <PostSkeleton /> : <MemoizedPost post={post} />}
                        </React.Fragment>
                    ))}
                    {posts.length<count && <h5 className='border border-primary rounded-lg text-slate-300 text-center text-xs py-1.5 w-28 my-5 mx-auto cursor-pointer hover:text-slate-200' onClick={()=>setPage((prevPage) => prevPage + 1)} >Show more</h5>}
                </div>
            </section>
        </div>
    )
}

export default Home