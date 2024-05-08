import React, { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { TbMessage } from "react-icons/tb";
import timeAgo from "../helper/timeAgo";
import { toast } from "react-toastify";
import axios from "../axios";
import { isAction } from "redux";
import Comments from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, } from "react-router-dom";
import { updateFollowList } from "../redux/userSlice";
import TailwindDialog from "./TailwindDialog";
import { MdOutlineSaveAlt } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { FaRegShareSquare } from "react-icons/fa";
import { LuThumbsDown } from "react-icons/lu";

const Post = ({ post, fromProfile,savedPosts,setSavedPosts,fromSavedPosts }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user);
    const description = post.content
    const [like, setLike] = useState(false);
    const [postAction, setPostAction] = useState('initialValue');
    const [likeCount, setLikeCount] = useState(post?.likes.length);
    const [expanded, setExpanded] = useState(false);

    const [checkAlreadyFollow, setCheckAlreadyFollow] = useState(false)
    const [checkAlreadyLike, setCheckAlreadyLike] = useState(false)

    //for dropdown button
    const [isOpen,setIsOpen] = useState(false);

    //for warning dialog
    const [OpendDialog,setOpendDialog] = useState(false);



    const toggleExpanded = () => {
        //console.log(expanded);
        setExpanded(!expanded);
    };

    const checkAlreadyLiked = () => {
        const currentUserId = currentUser._id
        return post.likes.includes(currentUserId);
    }

    //Handle like or Dislike actions
    const handlePostAction = async (action) => {
        const id = post._id
        const userId = currentUser._id
        try {
            await axios.put(`/post/post_action/${id}`, { action: action, userId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then((response) => {
                //action=='like'?setCheckAlreadyLike(true):setCheckAlreadyLike(false);
                console.log(response.data);
            })
        } catch (err) {
            toast.error(err.response?.message || err.message)
        }
    }

    //run if liked
    const isLike = () => {
        //setLike(true);
        setCheckAlreadyLike(true)
        setLikeCount(likeCount + 1)
        handlePostAction('like')
    }

    //run if disLiked
    const isDislike = () => {
        //setLike(false)
        setCheckAlreadyLike(false)
        setLikeCount(likeCount - 1);
        handlePostAction('dislike')
    }

    //When User clicks follow button,
    const handleFollowBtn = async () => {
        const currentUserId = currentUser._id;
        const userId = post.user._id
        const action = 'follow'
        // console.log(currentUserId);
        // console.log(userId);
        await axios.put('/users/update_follow_list', { currentUserId, userId,action }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response) => {
            dispatch(updateFollowList(userId))
            setCheckAlreadyFollow(true);
            toast.success(`Now you are following ${post.user.name}`)
            console.log(response.data);
        }).catch((err) => {
            toast.error(err.message)
            console.log(err)
        })
    }

    const onProfileClick = () => {
        navigate(`/user/${post.user._id}`)
    }

    //Checking user is already following !
    const checkAlreadyFollowing = () => {
        const userId = post.user._id
        const currentUserId = currentUser._id

        if (userId === currentUserId) {
            return true;
        }

        return currentUser.following.includes(userId);
    }

    

    

    useEffect(() => {
        const check = checkAlreadyFollowing()
        setCheckAlreadyFollow(check);

        const checkLike = checkAlreadyLiked()
        setCheckAlreadyLike(checkLike)
        //console.log(check)

    }, [])

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Handling save post and Unsave post by action (save/unsave)
    const handleSavePost = async(action)=>{
        const userId = currentUser._id;
        const postId = post._id
        
        await axios.post('/post/save_post',{userId,postId,action}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then((response)=>{
            if(action==='unsave'){
                handleUnsave(postId)
            }
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
            console.log(response.data)
            setIsOpen(false);
        }).catch((err)=>[
            toast.error(err.response?.data || err.message)
        ])
    }

    //handle unsave post from frontend;
    const handleUnsave = (id) =>{
        const updatedSavedPosts = savedPosts.filter(post =>post._id !==id);
        setSavedPosts(updatedSavedPosts);
    }

    return (
        <>
            <div className={`${fromProfile ? `md:w-3/5` : 'md:w-2/5'} sm:w-4/5 w-11/12 rounded-md text-xs my-2 mx-auto bg-[#333A45]`}>
                <div className="text-slate-300 py-4 px-6">
                    <div className=" flex">

                        {post?.user.profilePicture ? <img onClick={onProfileClick} className="w-10 cursor-pointer h-10 rounded-full" src={post?.user.profilePicture} /> : <div onClick={onProfileClick} className=" bg-primary w-10 h-10 rounded-full cursor-pointer text-center text-black text-xl pt-1.5 font-semibold">{post?.user.name.split('')[0].toUpperCase()}</div>}
                        <div className="ml-2">
                            <h5 onClick={onProfileClick} className="text-lg cursor-pointer font-semibold text-white">
                                {post?.user.name}
                            </h5>
                            <p className="text-[0.65rem]">{timeAgo(post.createdAt)}</p>
                        </div>
                        {!checkAlreadyFollow && <p onClick={handleFollowBtn} className="ml-2 mt-2 cursor-pointer hover:text-blue-400 text-blue-300">Follow</p>}
                        
                        <div className="relative z-10 inline-block text-left ml-auto mt-2 mr-2">
                            <button
                                className="inline-flex justify-end  hover:bg-gray-600 rounded-full p-1 bg- text-sm font-medium text-slate-300 hover:text-gray-200 focus:outline-non"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <BiDotsVerticalRounded size={20} className="" />
                                
                            </button>

                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <p
                                            onClick={fromSavedPosts?()=>handleSavePost('unsave'):()=> handleSavePost('save')}
                                            className="flex px-4 py-2 cursor-pointer text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                                            role="menuitem"
                                        >
                                           {fromSavedPosts?
                                           <><LuThumbsDown className="mr-2" size={18} />Unsave </>:
                                           <><MdOutlineSaveAlt className="mr-2" size={18} />Save Post</>}
                                        </p>
                                        <p
                                            onClick={() => { setOrderType('Tomorrow'), setIsOpen(false) }}
                                            className="flex px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                                            role="menuitem"
                                        >
                                            <FaRegShareSquare size={18} className="mr-2" />Share Post
                                        </p>
                                        {/* <p
                                            onClick={() => { setOrderType('One Week'), setIsOpen(false) }}
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                                            role="menuitem"
                                        >
                                            One Week
                                        </p> */}
                                        {post.user._id===currentUser._id?<p
                                            onClick={() =>{setOpendDialog(true),setIsOpen(false)}}
                                            className="block px-4 py-2 cursor-pointer text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                                            role="menuitem"
                                        >
                                            Delete
                                        </p>:<p
                                            onClick={() => { setOrderType('One Week'), setIsOpen(false) }}
                                            className="flex px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-200"
                                            role="menuitem"
                                        >
                                            <GoReport size={18} className="mr-2" />Report Post
                                        </p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {OpendDialog&&<TailwindDialog type={'delete_post'} title={'Delete Post'}  description={`Are you sure you want to Delete this post !`} setOpendDialog={setOpendDialog} post={post} />}

                    <div className="my-2 mt-4">
                        <pre style={{ fontFamily: '"Poppins", sans-serif', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            className={`${expanded
                                ? "leading-5 text-[0.87rem] "
                                : post?.mediaUrls[0] ? "line-clamp-3 leading-5 text-[0.87rem]" : ("line-clamp-6 leading-5 text-[0.87rem]")
                                }`}
                        >
                            {/* <p className={`line-clamp${expanded ? '' : '-3'} leading-5 text-[0.87rem]`} > */}
                            {description}
                        </pre>
                        {post?.mediaUrls[0] && description.length > 200 ? (
                            <button
                                onClick={toggleExpanded}
                                className="mt-2 text-blue-500 hover:underline focus:outline-none"
                            >
                                {expanded ? "Read Less" : "Read More"}
                            </button>
                        ) : description.length > 200 && (<button
                            onClick={toggleExpanded}
                            className="mt-2 text-blue-500 hover:underline focus:outline-none"
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>)}
                        {post?.mediaUrls[0] && <div className=" mt-2 h-48 rounded-md">
                            {post?.mediaUrls[0].includes('/image/upload/')&&<img className="h-48 w-full rounded-md" src={post.mediaUrls[0]} />}
                            {post?.mediaUrls[0].includes('/video/upload/')&&<video onClick={togglePlayPause} ref={videoRef} className="h-48 w-full rounded-md" src={post.mediaUrls[0]} />}
                        </div>}
                    </div>
                    <div className="flex">
                        <div className="flex hover:text-slate-100 mt-4 cursor-pointer">
                            {checkAlreadyLike ? (
                                <GoHeartFill
                                    onClick={isDislike}
                                    color="#FF5757"
                                    size={18}
                                />
                            ) : (
                                <GoHeart onClick={isLike} size={18} />
                            )}
                            <p className="text-[0.86rem] mx-1">{likeCount}</p>
                        </div>
                        {/* <div className="flex ml-4 hover:text-slate-100 cursor-pointer">
                            <TbMessage size={18} />
                            <p className="text[0.86rem] mx-1">23</p>
                        </div> */}
                        <Comments post={post} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
