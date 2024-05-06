import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import TradingViewWidget from '../components/ListedStocks'
import MarketOverview from '../components/marketOverview'
import { MoonLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";

const Stocks = () => {
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
        if(validateUserInput(inputValue)){
            navigate(`/symbol/${inputValue}`);
        }
        
    };

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
                    <div className='float-right my-6' style={{ position: 'relative' }}>
                        <input ref={inputRef} type='text' placeholder='Search Symbol' className='px-3 py-2 text-slate-100 text-sm w-full rounded-md bg-slate-600 outline-none bg-opacity-45 pr-10' />
                        {loading ? <div style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><MoonLoader color='white' size={18} /></div> : <button onClick={handleSubmit} className='mr-1 sm:mr-4 text-blue-300' style={{ position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)' }}><IoSearchOutline className='' /></button>}
                    </div>
                    {/* <input placeholder='Search' onChange={(e)=>handleOnChange(e)} className='float-right my-6 outline-none bg-slate-700 text-white placeholder:text-sm px-2 rounded-md py-1' /> */}
                </div>
            </div>
            <div className='sm:w-3/5 mx-auto relative overflow-x-scroll sm:overflow-hidden ' >

                <MarketOverview />
            </div>


        </div>
    )
}

export default Stocks