import React, { useState, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { TbMessage } from "react-icons/tb";
import timeAgo from "../helper/timeAgo";
const Post = ({ post }) => {
    const description = post.content
    const [like, setLike] = useState(false);
    const [expanded, setExpanded] = useState(false);


    const toggleExpanded = () => {
        console.log(expanded);
        setExpanded(!expanded);
    };

    return (
        <>
            <div className="md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 mx-auto bg-[#333A45]">
                <div className="text-slate-300 py-4 px-6">
                    <div className=" flex">
                        <div className="border w-10 h-10 rounded-full"></div>
                        <div className="ml-2">
                            <h5 className="text-lg font-semibold text-white">
                                {post.user.name}
                            </h5>
                            <p className="text-[0.65rem]">{timeAgo(post.createdAt)}</p>
                        </div>
                        <p className="ml-2 mt-2 text-blue-300">Follow</p>
                        <BiDotsVerticalRounded size={20} className="ml-auto mt-2 mr-2" />
                    </div>
                    <div className="my-2 mt-4">
                        <pre style={{fontFamily:'"Poppins", sans-serif', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            className={`${expanded
                                    ? "leading-5 text-[0.87rem] "
                                    :post?.mediaUrls[0]? "line-clamp-3 leading-5 text-[0.87rem]":("line-clamp-6 leading-5 text-[0.87rem]")
                                }`}
                        >
                            {/* <p className={`line-clamp${expanded ? '' : '-3'} leading-5 text-[0.87rem]`} > */}
                            {description}
                        </pre>
                        {post?.mediaUrls[0] && description.length > 200 ?(
                            <button
                                onClick={toggleExpanded}
                                className="mt-2 text-blue-500 hover:underline focus:outline-none"
                            >
                                {expanded ? "Read Less" : "Read More"}
                            </button>
                        ):description.length > 200 && (<button
                            onClick={toggleExpanded}
                            className="mt-2 text-blue-500 hover:underline focus:outline-none"
                        >
                            {expanded ? "Read Less" : "Read More"}
                        </button>)}
                        {post?.mediaUrls[0] &&<div className=" mt-2 h-48 rounded-md">
                            <img className="h-48 w-full rounded-md" src={post.mediaUrls[0]} />
                        </div>}
                    </div>
                    <div className="flex">
                        <div className="flex hover:text-slate-100 cursor-pointer">
                            {like ? (
                                <GoHeartFill
                                    onClick={() => setLike(false)}
                                    color="#FF5757"
                                    size={18}
                                />
                            ) : (
                                <GoHeart onClick={() => setLike(true)} size={18} />
                            )}
                            <p className="text-[0.86rem] mx-1">1,234</p>
                        </div>
                        <div className="flex ml-4 hover:text-slate-100 cursor-pointer">
                            <TbMessage size={18} />
                            <p className="text[0.86rem] mx-1">23</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
