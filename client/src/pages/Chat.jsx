import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import io from 'socket.io-client';
import { TiMessages } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../axiosInstance';
import Messages from '../components/Messages';
import { toast } from 'react-toastify';
import { setCurrentChatId, setCurrentReciever } from '../redux/chatSlice';

const socket = io('http://localhost:5252');

const Chat = () => {
    const dispatch = useDispatch();
    const [sideNav, setSideNav] = useState(true);
    const { currentChatId } = useSelector((state) => state.chat);
    const { currentReciever } = useSelector((state) => state.chat)
    const { currentUser } = useSelector((state) => state.user);
    const [selected, setSelected] = useState(undefined);
    const [chatHistory, setChatHistory] = useState([]);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedReceiver, setSelectedReceiver] = useState({});
    // const [selectChat, setSelectChat] = useState(false);

    const getChats = useCallback(async () => {
        try {
            const response = await axios.get(`/chat/get_chats/${currentUser._id}`);
            setChats(response.data.chats);
            if (currentChatId !== undefined) {
                //selectChat(true)
                setSelected(currentChatId);
                //console.log(currentChatId)
                setSelectedReceiver(currentReciever);
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    }, [currentChatId]);

    useEffect(() => {
        getChats();
    }, [getChats]);

    useEffect(() => {
        if (selected !== undefined) {
            console.log('starting')
            socket.emit('start chat', selected, currentUser._id);
        }

        socket.on('chat history', (messages) => {
            setChatHistory(messages);
        });

        // socket.on('getMessage', (message) => {
        //     setChatHistory((prevMessages) => [...prevMessages, message]);
        // });

        return () => {
            socket.off('chat history');
        };
    }, [selected, currentUser._id]);

    useEffect(() => {
        socket.on('connection', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.off('connection');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('getMessage', (message) => {
                console.log('gettting messages');
                setChatHistory((prevMessages) => [...prevMessages, message]);
            });

        }
        // Cleanup the event listener on component unmount
        return () => {
            socket.off('getMessage');
        };
    }, [socket]);

    const handleSendMessage = (content) => {
        if (selected && selectedReceiver._id) {
            const messageData = {
                senderId: currentUser._id,
                receiverId: selectedReceiver._id,
                content,
                chatId: selected,
            };

            // const messageObject = {
            //     sender: currentUser._id,
            //     content,
            //     chat: selected
            // }

            socket.emit('sendMessage', messageData);
            console.log('message', message)

            //setChatHistory((prevMessages) => [...prevMessages, messageObject]);

        }
    };

    // useEffect(() => {
    //     socket.on('getMessage', (message) => {
    //         setChatHistory((prevMessages) => [...prevMessages, message]);
    //     });

    //     return () => {
    //         socket.off('getMessage');
    //     };
    // }, []);

    const handleChatSelect = (chat) => {
        setSelected(chat._id);
        dispatch(setCurrentChatId(chat._id));
        const receiver = chat.users.find((user) => user._id !== currentUser._id);
        dispatch(setCurrentReciever(receiver))
        setSelectedReceiver(receiver);
        //setSelectChat(true);
    };

    return (
        <div>
            <Header />
            <div className='h-[87vh] flex '>
                {sideNav && (
                    <div className='sm:w-1/3 '>
                        <h1 className='text-slate-200 px-2 sm:pl-6 pt-2 sm:pr-6 font-semibold text-2xl'>Chat</h1>
                        <div className='mt-6'>
                            {chats.map((chat) => (
                                <div
                                    key={chat._id}
                                    onClick={() => handleChatSelect(chat)}
                                    className={`${selected === chat._id ? 'bg-slate-200 bg-opacity-20' : 'bg-slate-400  bg-opacity-10'} flex border-b border-slate-600   px-2 sm:pl-6 pt-2 py-4 sm:pr-6`}
                                >
                                    <div className='rounded-full w-14'>
                                        {chat.users.find((user) => user._id !== currentUser._id).profilePicture?<img className='w-7 h-7 sm:w-9 sm:h-9 rounded-full' src={chat.users.find((user) => user._id !== currentUser._id).profilePicture} alt='Profile' />:<div className='w-9 h-9 rounded-full bg-primary text-center py-1.5' >{chat.users.find((user) => user._id !== currentUser._id).name.split("")[0].toUpperCase()}</div>}
                                    </div>
                                    <div className='sm:ml-0 w-full'>
                                        <p className='text-slate-200'>
                                            {chat.users.find((user) => user._id !== currentUser._id).name}
                                        </p>
                                        <p className='text-xs text-slate-400' >{chat.latestMessage?.content.length > 16
                                            ? chat.latestMessage?.content.substring(0, 16) + "..."
                                            : chat.latestMessage?.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    {sideNav ? (
                        <IoIosArrowBack className='text-slate-400 sm:hidden' onClick={() => setSideNav(false)} />
                    ) : (
                        <IoIosArrowForward className='text-slate-400' onClick={() => setSideNav(true)} />
                    )}
                </div>

                <div className='ml-1 sm:border-l border-slate-600 border-opacity-60 h-auto w-full'>
                    
                        <Messages
                            selectedReceiver={selectedReceiver}
                            handleSendMessage={handleSendMessage}
                            setChatHistory={setChatHistory}
                            setMessage={setMessage}
                            chatHistory={chatHistory}
                        />
                    
                </div>
            </div>
        </div>
    );
};

export default Chat;
