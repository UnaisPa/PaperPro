// import React, { useEffect, useRef, useState } from 'react';
// import { BiDotsHorizontalRounded } from 'react-icons/bi';
// import EmojiInput from './EmojiInput';
// import './messages.css';
// import { TiMessages } from 'react-icons/ti';

// const Messages = ({ selectedReceiver, handleSendMessage, setChatHistory, setMessage, chatHistory }) => {
//     const messageEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [chatHistory]);

//     return (
//         <>
//             {selectedReceiver._id ? <div className='min-h-[87vh] text-slate-300'>
//                 <div className='border-b border-slate-600 flex items-center'>
//                     <div className='w-1/3 py-3 px-2'>
//                         <div className='w-8 h-8 rounded-full'>
//                             {selectedReceiver?.profilePicture ? (
//                                 <img src={selectedReceiver.profilePicture} alt='Profile' className='w-8 h-8 rounded-full' />
//                             ) : (
//                                 <div className='w-8 h-8 text-center py-[0.20rem] bg-primary text-slate-950 rounded-full'>
//                                     {selectedReceiver?.name?.charAt(0)}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div className='w-1/3 py-3 text-center'>
//                         <p className='font-medium'>{selectedReceiver?.name}</p>
//                     </div>
//                     <div className='w-1/3 py-3 pr-2 text-right'>
//                         <div className='cursor-pointer w-7 py-[0.25rem] px-1 rounded-full h-7 ml-auto hover:bg-slate-600'>
//                             <BiDotsHorizontalRounded size={20} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='border-b border-slate-600 h-[68vh] overflow-auto overflow-x-hidden px-2 w-full scroll-container'>
//                     <div className='mt-2 mb-2'>
//                         {chatHistory.map((message, index) => (
//                             <div key={index} className={`flex items-end ${message.senderId === selectedReceiver._id ? 'justify-start' : 'justify-end'} relative my-2`}>
//                                 <div className={`bg-gradient-to-r ${message.senderId === selectedReceiver._id ? 'from-slate-600 to-slate-500' : 'from-green-500 to-green-600'} rounded-lg p-4 shadow-md max-w-xs relative`}>
//                                     <p className='text-white'>{message.content}</p>
//                                     <span className='text-xs text-gray-400 mt-1'>{message.time}</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='flex'>
//                     <div className='w-full'>
//                         <EmojiInput handleSendMessage={handleSendMessage} setMessage={setMessage} />
//                     </div>
//                 </div>
//             </div> : <div className='w-2/4 mx-auto my-40 text-center text-slate-400'>
//                 <TiMessages size={70} className='mx-auto' />
//                 <h1 className='font-semibold'>Discuss your strategies here!</h1>
//                 <p className='text-xs mt-2 opacity-70'>You can chat with users by clicking the chat button on the user profile</p>
//             </div>}
//         </>
//     );
// };

// export default Messages;

import React, { useEffect, useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import EmojiInput from './EmojiInput';
import { TiMessages } from 'react-icons/ti';
import './messages.css';
import { useSelector } from 'react-redux';
import convertToReadableTime from '../helper/readableTime';

const Messages = ({ selectedReceiver, handleSendMessage, setMessage, chatHistory }) => {
    const { currentUser } = useSelector((state) => state.user);
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        console.log(currentUser._id)
        scrollToBottom();
    }, [chatHistory]);

    return (
        <>
            {selectedReceiver?._id ? (
                <div className='min-h-[87vh] text-slate-300'>
                    <div className='border-b border-slate-600 flex items-center'>
                        <div className='w-1/3 py-3 px-2'>
                            <div className='w-8 h-8 rounded-full'>
                                {selectedReceiver?.profilePicture ? (
                                    <img src={selectedReceiver.profilePicture} alt='Profile' className='w-8 h-8 rounded-full' />
                                ) : (
                                    <div className='w-8 h-8 text-center py-[0.20rem] bg-primary text-slate-950 rounded-full'>
                                        {selectedReceiver?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-1/3 py-3 text-center'>
                            <p className='font-medium'>{selectedReceiver?.name}</p>
                        </div>
                        <div className='w-1/3 py-3 pr-2 text-right'>
                            <div className='cursor-pointer w-7 py-[0.25rem] px-1 rounded-full h-7 ml-auto hover:bg-slate-600'>
                                <BiDotsHorizontalRounded size={20} />
                            </div>
                        </div>
                    </div>
                    <div className='border-b border-slate-600 h-[68vh] overflow-auto overflow-x-hidden px-2 w-full scroll-container'>
                        <div className='mt-2 mb-2'>
                            {chatHistory.map((message, index) => (
                                <div className={`flex  ${message.sender === currentUser._id ? ('justify-end ') : 'justify-start'} `}
                                >
                                    {message.sender !== currentUser._id&&<div className='mr-2  rounded-full w-8 h-8' >
                                        {selectedReceiver?.profilePicture?<img className='rounded-full mt-2' src={selectedReceiver?.profilePicture} />:<div className=' rounded-full w-8 h-8 mt-2 bg-primary text-black text-center py-1' >{selectedReceiver.name.split("")[0].toUpperCase()}</div>}
                                    </div>}
                                    <div
                                        key={index}
                                        className={`flex items-end  ${message.sender === currentUser._id ? ('justify-end ') : 'justify-start'} relative my-2`}
                                    >
                                        <div
                                            className={`bg-gradient-to-r ${message.sender === currentUser._id ? 'from-green-500 to-green-600' : 'from-slate-600 to-slate-500'} rounded-lg p-4 shadow-md max-w-xs relative`}
                                        >
                                            <p className='text-white'>{message.content}</p>
                                            <span className='text-xs flex justify-end text-slate-300 mt-1'>{convertToReadableTime(message.createdAt?message.createdAt:Date.now())}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-full'>
                            <EmojiInput handleSendMessage={handleSendMessage} setMessage={setMessage} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-2/4 mx-auto my-40 text-center text-slate-400'>
                    <TiMessages size={70} className='mx-auto' />
                    <h1 className='font-semibold'>Discuss your strategies here!</h1>
                    <p className='text-xs mt-2 opacity-70'>You can chat with users by clicking the chat button on the user profile</p>
                </div>
            )}
        </>
    );
};

export default Messages;

