import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatNumber from '../helper/formatNumber';
import { MdHourglassEmpty } from 'react-icons/md';
import axios from '../axiosInstance';
import { setCompletedTrades } from '../redux/completedTradesSlice';
import { SingleTicker } from 'react-ts-tradingview-widgets';
import { ClipLoader } from 'react-spinners';
import formatDate from '../helper/formatDate';
import { Link, useNavigate } from 'react-router-dom';
import PortfolioPerformanceGraph from './performanceChart';


const TradesComponent = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const { currentUser } = useSelector((state) => state.user);
    //const completedTrades = useSelector((state) => state.completedTrades)
    const [trades,setTrades] = useState([])
    useEffect(() => {
        getPastTrades()
    }, [])

    const getPastTrades = async () => {
        const userId = user
        axios.get(`/portfolio/get_past_trades/${userId}`).then((response) => {
            //console.log(response.data);
            setTrades(response.data.trades);
            //dispatch(setCompletedTrades(response.data.trades));
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="mt-4 p-1 border-t border-slate-500  rounded-md w-full">

            

            <p className='text-slate-400 mt-2' >Completed Trades</p>
            <div className='mt-32 sm:mt-4' >
                {trades?.length > 0 ? <>
                    {trades.map((trade) => {
                        return (
                            <div className='border border-gray-600 rounded-md mt-2 sm:flex' >
                                <div onClick={(event) => { event.preventDefault(), navigate(`/symbol/${trade.stockSymbol}`) }} className=' w-full sm:w-1/2' >
                                    {/* <SingleTicker symbol={`${trade.stockSymbol}`} isTransparent colorTheme='dark' /> */}
                                    <div className='' >
                                        <div className='flex  mt-10' >
                                            <Link to={`/symbol/${trade.stockSymbol}`} ><h1 className='text-slate-200 hover:opacity-90 cursor-pointer text-2xl text-center sm:text-left  sm:ml-10 sm:mx-0 ' >{trade.companyName}</h1></Link>
                                            <p className='ml-auto mr-3 text-slate-400 text-xs' >{formatDate(trade.createdAt)}</p>
                                        </div>
                                        <p className='text-slate-300 text-center sm:text-left sm:ml-10 sm:mx-0' >{trade.stockSymbol}</p>
                                        <p className='text-slate-300 text-center text-sm sm:text-left sm:ml-10 sm:mx-0' >{trade.exitedReason}</p>

                                    </div>
                                </div>
                                <div className=' w-full sm:flex' >
                                    <div className='border-l border-gray-600 w-full sm:w-1/4 text-center my-2 sm:my-10' >
                                        <p className={`${trade.profit > 0 ? "text-green-400" : trade.profit < 0 ? "text-red-400" : "text-slate-200"} text-2xl font-semibold`} ><>{trade.profit.toFixed(2)} <span className='text-xs' >USD</span></></p>
                                        <p className={`${trade.profit > 0 ? "text-green-400" : trade.profit < 0 ? "text-red-400" : "text-slate-200"} opacity-80 `} > <>{trade.profitPercentage > 0 ? "+" + trade.profitPercentage.toFixed(2) : trade.profitPercentage.toFixed(2)} <span className='text-xs' >%</span></></p>
                                        <p className='text-xs text-slate-400 opacity-85' >P&L</p>
                                    </div>
                                    <div className='w-full  sm:w-1/4 py-5 sm:my-10 text-center' >
                                        <p className={`text-slate-200 opacity-80 `} > <>{trade.totalPrice.toFixed(2)} <span className='text-xs' >USD</span></></p>
                                        <p className='text-xs text-slate-400 opacity-85' >Invested</p>
                                    </div>
                                    <div className='w-full sm:w-1/4 py-5 sm:my-10 text-center' >
                                        <p className={`text-slate-200 opacity-80 `} > <>{(parseFloat(trade.totalPrice) + parseFloat(trade.profit)).toFixed(2)} <span className='text-xs' >USD</span></></p>
                                        <p className='text-xs text-slate-400 opacity-85' >Total return</p>
                                    </div>
                                    <div className='w-full text-center sm:text-left sm:w-1/4 py-5 pl-2 sm:my-7 ' >
                                        <p className='text-slate-300 text-sm' > Purchased At : <span className='font-semibold'>$ {trade.stockPrice}</span></p>
                                        <p className='text-slate-300 text-sm' > Quantitity : <span className='font-semibold' >{trade.quantity}</span></p>
                                        <p onClick={() => navigate(`/symbol/${trade.stockSymbol}`)} className='text-blue-400 hover:text-blue-200 cursor-pointer text-xs mt-1' >View Stock Details</p>

                                    </div>

                                    {/* <h1>{trade.stockSymbol}</h1> */}
                                    {/* <h2 className='text-white'>{trade.companyName}</h2> */}

                                </div>
                            </div>
                        )
                    })}
                </> : <>
                    <div className='text-slate-400 mt-20 mb-9' >
                        <MdHourglassEmpty size={28} className='mx-auto' />
                        <p className='text-center mt-1' >No completed Trades</p>
                    </div>
                </>}
            </div>
        </div>
    ) 
}

export default TradesComponent