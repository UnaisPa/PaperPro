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
import axios from '../../axiosInstance';
import { ClipLoader, MoonLoader } from "react-spinners"
import { useSelector, useDispatch } from 'react-redux';

import timeAgo from '../../helper/timeAgo';
import { FaExclamationCircle, FaRegUser } from 'react-icons/fa';
import formatDate from '../../helper/formatDate';


export default function ReportDetails({ post,reportedBy,reason,postBy,createdAt }) {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [limit,setLimit] = useState(2)
    const limitedCommentsArray = post.comments.slice(0,limit)

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
                    <div className="flex text-slate-300 ml-auto hover:text-slate-100 cursor-pointer">
                    <FaExclamationCircle size={18} />
                    </div>
                </AccordionSummary>
                <AccordionDetails className='' >

                    <p className='text-slate-300' >Details</p>
                    
                    {/* <p className='text-[0.90rem] text-slate-300 mt-1' >Reported By : <span className='ml-2 font-semibold' >{reportedBy.name}</span></p>
                    <p className='text-[0.90rem] text-slate-300 mt-1' >Reason : <span className='ml-2 font-semibold' >{reason}</span></p> */}
                    <div className=' mt-3 flex border-b pb-3 border-slate-600' >
                        <h1 className='text-slate-300 text-[1rem]  w-32' >Reported By </h1>
                        <div className=' flex ml-5 w-full' >
                            {reportedBy.profilePicture?<img src={reportedBy.profilePicture} className='w-8 h-8 rounded-full mx-2' />:<div className='w-8 h-8 rounded-full border bg-primary' ><FaRegUser color='black' /></div>}
                            <div>
                                <p className='text text-slate-300' >{reportedBy.name}</p>
                                <p className='text text-slate-300' >{reportedBy.email}</p>

                            </div>
                            <p className='ml-auto text-slate-400' >
                                {formatDate(createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className=' mt-3 flex border-b pb-3 border-slate-600' >
                        <h1 className='text-slate-300 text-[1rem]  w-32' >Post By </h1>
                        <div className=' flex ml-5 w-full' >
                            {postBy.profilePicture?<img src={postBy.profilePicture} className='w-8 h-8 rounded-full mx-2' />:<div className='w-8 h-8 rounded-full bg-primary mx-2' ><FaRegUser className='mx-2.5 my-2' color='black' /></div>}
                            <div>
                                <p className='text text-slate-300' >{postBy.name}</p>
                                <p className='text text-slate-300' >{postBy.email}</p>

                            </div>
                        </div>
                    </div>
                    <div className=' mt-3 flex  pb-3 border-slate-500' >
                        <h1 className='text-slate-300 text-[1rem]  w-32' >Reason </h1>
                        <div className=' flex ml-5 w-full ' >
                           <p className='text-slate-200 ml-3 text-[1rem]' >{reason}</p>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}