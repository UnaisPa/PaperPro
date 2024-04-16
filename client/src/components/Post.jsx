import React, { useState, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { TbMessage } from "react-icons/tb";

const Post = () => {
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const [like, setLike] = useState(false);
  const [expanded, setExpanded] = useState(false);


  const toggleExpanded = () => {
    console.log(expanded);
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="md:w-2/5 sm:w-4/5 w-11/12 rounded-md text-xs my-2 mx-auto bg-[#4C525E]">
        <div className="text-slate-300 py-4 px-6">
          <div className=" flex">
            <div className="border w-10 h-10 rounded-full"></div>
            <div className="ml-2">
              <h5 className="text-lg font-semibold text-white">
                Muhameed Aiman
              </h5>
              <p className="text-[0.65rem]">February 11</p>
            </div>
            <p className="ml-2 mt-2 text-blue-300">Follow</p>
            <BiDotsVerticalRounded size={20} className="ml-auto mt-2 mr-2" />
          </div>
          <div className="my-2">
            <p
              className={`${
                expanded
                  ? "leading-5 text-[0.87rem]"
                  : "line-clamp-3 leading-5 text-[0.87rem]"
              }`}
            >
              {/* <p className={`line-clamp${expanded ? '' : '-3'} leading-5 text-[0.87rem]`} > */}
              {description}
            </p>
            {description.length > 200 && (
              <button
                onClick={toggleExpanded}
                className="mt-2 text-blue-500 hover:underline focus:outline-none"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
            <div className="border mt-2 h-48 rounded-md"></div>
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
