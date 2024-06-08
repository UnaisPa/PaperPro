import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import TradingViewWidget from '../components/ListedStocks'
// import MarketOverview from '../components/marketOverview'
import { MoonLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { SingleTicker } from 'react-ts-tradingview-widgets'
import { MdOutlineBookmarkAdd, MdOutlineBookmarkRemove } from 'react-icons/md'
import { useSelector } from 'react-redux'
import axios from '../axiosInstance'
import { toast } from 'react-toastify'

const Stocks = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const validateUserInput = (input) => {
        if (input.trim() == '') {
            toast.error('Enter symbol name!')
            return false;
        } else {
            return true
        }
    }



    const inputRef = useRef(null);
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSubmit = () => {
        setLoading(true)
        const inputValue = inputRef.current.value;
        setSubmittedValue(inputValue);
        console.log(submittedValue)
        setLoading(false);
        if (validateUserInput(inputValue)) {
            navigate(`/symbol/${inputValue}`);
        }

    };

    const stocks = ['AAPL','MSFT','NFLX','VISA','TSLA','AMZN','NVDA','XOM','GOOG','PYPL']

    const addToWatchlist = (symbol) =>{
        const userId = currentUser._id;
        axios.post('/users/add_to_watchlist',{userId:userId,stockSymbol:symbol}).then((response)=>{
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
        }).catch((err)=>{
            toast.error(err.response?.data?err.response?.data.message:err.message)
            console.log(err);
        })
    }

    return (
        <div >
            <Header />
            {/* <TradingViewWidget/> */}
            <div className='flex sm:w-3/5 sm:mx-auto ml-5 ' >
                <div className=' w-full' >
                    <h3 className='mt-4 text-slate-200 text-2xl ' >Market Overview</h3>
                    <p className='mt-1 mb-7 text-slate-400 text-sm' >Analyze the Market</p>
                </div>
                <div className='w-full' >
                    <form onSubmit={handleSubmit} className='float-right my-6' style={{ position: 'relative' }}>
                        <input ref={inputRef} type='text' placeholder='Search Symbol' className='px-3 py-2 text-slate-100 text-sm w-full rounded-md bg-slate-600 outline-none bg-opacity-45 pr-10' />
                        {loading ? <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><MoonLoader color='white' size={18} /></div> : <button type='submit' className='mr-1 sm:mr-4 text-blue-300' style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><IoSearchOutline className='' /></button>}
                    </form>
                    {/* <input placeholder='Search' onChange={(e)=>handleOnChange(e)} className='float-right my-6 outline-none bg-slate-700 text-white placeholder:text-sm px-2 rounded-md py-1' /> */}
                </div>
            </div>
            <div className='sm:w-3/5 mx-auto relative overflow-x-scroll sm:overflow-hidden ' >
                {stocks.map((stock) => {
                    return (
                        <div key={stock} className='border mt-1.5 rounded-md border-slate-500 flex justify-between' >
                            <SingleTicker symbol={stock} isTransparent colorTheme='dark' />
                            <div  className=' w-1/2 sm:w-1/3 ' >
                                <h1 onClick={()=>addToWatchlist(stock)} className=' mt-3 mx-2 float-right cursor-pointer text-slate-200 hover:bg-slate-700 rounded-full p-2' ><MdOutlineBookmarkAdd size={20} /></h1>
                                <div onClick={() => navigate(`/symbol/${stock}`)} className=' cursor-pointer py-10  w-3/4 text-slate-200' >
                                    <h1 className=' text-xl font-semibold pl-3' >{stock}</h1>
                                    <p className='text-xs pl-3 opacity-80 hover:opacity-100 cursor-pointer' >Stock Details</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* <MarketOverview /> */}
            </div>


        </div>
    )
}

export default Stocks