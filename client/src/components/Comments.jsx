import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TbMessage } from "react-icons/tb";
import { toast } from "react-toastify";
import { useState } from 'react';
import axios from "../axios"
import { ClipLoader, MoonLoader } from "react-spinners"
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../redux/postSlice';
import timeAgo from "../helper/timeAgo";


export default function Comments({ post }) {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    //handle comment submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateUserInput(text)) {
            setLoading(true)
            const postId = post._id
            const userId = currentUser._id
            console.log(postId, userId)

            await axios.post('/post/add_comment', { postId, userId, text }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then((response) => {
                console.log(response.data)
                toast.success(response.data.message);
                dispatch(updatePost(response.data.post));
                setText('')
            }).catch((err) => {
                toast.error(err.response?.message || err.message)
                console.log(err.response || err.message)
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
        }
    }

    const validateUserInput = (input) => {
        if (input.trim() == '') {
            toast.error('Enter your Comment!')
            return false;
        } else {
            return true
        }
    }
    return (
        <div className='w-full'>
            <Accordion className='bg-opacity-0 shadow-none' sx={{ background: 'transparent', boxShadow: 'none', padding: 0, }}>
                <AccordionSummary

                    aria-controls=""
                    id="panel1-header"
                >
                    <div className="flex ml-4 text-slate-300 hover:text-slate-100 cursor-pointer">
                        <TbMessage size={18} />
                        <p className="text-xs mx-1">{post.comments.length}</p>
                    </div>
                    <div sx={{ padding: 0 }} ></div>
                </AccordionSummary>
                <AccordionDetails className='' >

                    <form className='' style={{ position: 'relative' }}>
                        <input value={text} name='text' type='text' onChange={(e) => setText(e.target.value)} placeholder='Your comment' className='p-2.5 text-slate-100 w-full rounded-md bg-slate-600 outline-none bg-opacity-45 pr-10' />
                        {loading ? <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><MoonLoader color='white' size={18} /></div> : <button onClick={handleSubmit} type='submit' className='mr-6 sm:mr-0 text-blue-300' style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}>Post</button>}
                    </form>
                    {post.comments.length > 0 ? <><p className='text-slate-400 mb-2 mt-4 opacity-70' >{post.comments.length} Comments</p>
                        {post.comments.slice().reverse().map((comment, index) => (
                            <React.Fragment key={comment._id} >

                                <div className='flex text-slate-300' >
                                    <div className=" bg-primary w-7 h-7 rounded-full text-center text-black pt-1.5 font-semibold">N</div>
                                    <p className='font-semibold mt-1 mx-2 text-sm' >{comment.user.name}</p>
                                    <p className='text-[0.60rem] opacity-70 mt-1.5' >{timeAgo(comment.createdAt)}</p>
                                </div>
                                <div className='mt-1' >
                                    <p className='text-slate-300 text-sm ml-9' >{comment.text}</p>
                                    <p className='text-slate-300 text-[0.70rem] mt-2 opacity-60 ml-9'>Reply</p>
                                </div>

                            </React.Fragment>
                        ))}
                    </> : <p className='text-center text-slate-300 opacity-65 mt-4' >No comments yet.</p>}
                </AccordionDetails>
            </Accordion>

        </div>
    );
}