import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets"
import Header from './Header'
import { IoIosArrowRoundBack } from 'react-icons/io'
const AdvancedChart = () => {
    const { symbol } = useParams()
    const navigate = useNavigate()
  return (
    <>
    <Header/>
    <div className=' mx-16 mt-3' >
        <h1 className='text-slate-300 text-xl'> <IoIosArrowRoundBack onClick={()=>navigate(`/symbol/${symbol}`)} className='hover:text-slate-100 cursor-pointer size-12' /> Advanced Chart : {symbol.toLocaleUpperCase()}</h1>
        <div className='mt-4 h-[89vh]' >
        <AdvancedRealTimeChart  symbol={symbol} autosize theme='dark' />
        </div>
        <div className='w-2/4 mx-auto text-center mt-9 mb-10' >
            <h1 className='text-slate-200 text-xl'>Why Advanced Real-Time Charts ?</h1>
            <p className='text-slate-400 mt-2' >
            Unlock the full potential of your trading with advanced real-time charts, offering comprehensive analysis tools, interactive customization, and up-to-the-minute data. Easily apply various indicators, draw trendlines, and mark important levels to refine your strategies and improve decision-making. Designed for traders of all levels, these charts enhance trading accuracy and provide confidence in executing trades. Start using our advanced real-time charts today to elevate your trading experience and achieve better results.
            </p>
        </div>
    </div>
    </>
  )
}

export default AdvancedChart