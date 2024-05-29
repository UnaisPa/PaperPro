import React, { useState } from 'react'
import Header from '../components/Header'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Chat = () => {
    const [sideNav, setSideNav] = useState(true);
    const [selected,setSelected] = useState('')
    return (
        <div>
            <Header />
            <div className=' h-[87vh] flex mx-5' >

                {sideNav && <div className='sm:w-1/3  ' >
                    <h1 className='text-slate-200 px-2 sm:pl-6 pt-2 sm:pr-6 font-semibold text-2xl'>Chat</h1>
                    <div className='mt-6'>
                        <div className={`${selected=='1'? 'bg-slate-400':'border'} flex  border-slate-500 rounded-md  bg-opacity-10 px-2 sm:pl-6 pt-2 py-2 sm:pr-6`} >
                            <div className=' rounded-full w-14'>
                                <img className='w-7 h-7 sm:w-9 sm:h-9' src='/images/paperPro.png' />
                            </div>
                            <div className=' sm:ml-0 w-full'>
                                <p className='text-slate-200' >Muhammed</p>
                                <p className='text-slate-400 text-xs' >helo</p>
                            </div>
                        </div>
                        <div className={`${selected=='1'? 'bg-slate-400':'border'} flex mt-2 border-slate-500 rounded-md  bg-opacity-10 px-2 sm:pl-6 pt-2 py-2 sm:pr-6`} >
                            <div className=' rounded-full w-14'>
                                <img className='w-7 h-7 sm:w-9 sm:h-9' src='/images/paperPro.png' />
                            </div>
                            <div className=' sm:ml-0 w-full'>
                                <p className='text-slate-200' >Unais</p>
                                <p className='text-slate-400 text-xs' >helo</p>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className=' ' >
                    {sideNav ? <p onClick={() => setSideNav(false)}><IoIosArrowBack className='text-slate-400 sm:hidden' /></p> : <p onClick={() => setSideNav(true)}><IoIosArrowForward className='text-slate-400'  /></p>}
                </div>

                <div className='ml-1 border w-full' >

                </div>
            </div>
        </div>
    )
}

export default Chat