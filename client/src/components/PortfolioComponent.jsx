import React, { useEffect } from 'react'
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


const PortfolioComponent = ({ totalPortfolioProfit, margin, totalProfit, }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const {userIdForGettingTrades} = useSelector((state)=>state.user);
    const completedTrades = useSelector((state) => state.completedTrades)
    const last15Trades = completedTrades.slice(-15);

    useEffect(() => {
        getPastTrades()
    }, [])

    const getPastTrades = async () => {
        const userId = currentUser._id
        axios.get(`/portfolio/get_past_trades/${userId}`).then((response) => {
            //console.log(response.data);
            dispatch(setCompletedTrades(response.data.trades));
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="mt-4 p-1 border-t border-slate-500  rounded-md w-full">

            {totalPortfolioProfit>=0?<><div className='sm:flex mt-4 h-20' >
                <div className='text-center sm:text-left my-4 sm:my-0' >
                    <h1 className='text-slate-200 text-2xl font-semibold' ></h1>
                    {/* <p className='text-slate-400' >Past Trades</p> */}
                </div>


                <div className='w-full sm:w-3/3 ml-auto flex' >
                    <div className='w-2/6 mx-3 text-center py-6 sm:py-3 rounded-md bg-slate-200 bg-opacity-10' >
                        <h2 className={`${(parseFloat(totalProfit) + parseFloat(totalPortfolioProfit)) > 0 ? 'text-green-400' : (parseFloat(totalProfit) + parseFloat(totalPortfolioProfit)) < 0 ? 'text-red-400' : 'text-slate-100'} text-[15px] sm:text-xl font-semibold `} >{(parseFloat(totalProfit) + parseFloat(totalPortfolioProfit)).toFixed(2)} <span className='text-[9px] sm:text-xs' >USD</span></h2>
                        <p className='text-[10px] sm:text-sm text-slate-400' >Total P&L</p>
                    </div>
                    <div className='flex w-full rounded-md bg-slate-200 bg-opacity-10' >
                        <div className='text-center py-6 sm:py-4 w-1/3' >
                            <h2 className={`${totalPortfolioProfit > 0 ? "text-green-400" : totalPortfolioProfit < 0 ? "text-red-400" : "text-slate-200"} text-[13px] sm:text font-semibold`}  >{(totalPortfolioProfit).toFixed(2)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                            <h2 className={`${totalPortfolioProfit > 0 ? "text-green-400" : totalPortfolioProfit < 0 ? "text-red-400" : "text-slate-200"} text-[9px] sm:text-[10px]`}  >{((parseFloat(totalPortfolioProfit) / 1000000) * 100).toFixed(2)} <span className='text-[9px] sm:text-xs'  >%</span></h2>

                            <p className='text-[10px] sm:text-xs text-slate-400' >Past P&L</p>
                        </div>
                        <div className='text-center py-6 sm:py-4 w-1/3' >
                            <h2 className={`${totalProfit > 0 ? 'text-green-400' : totalProfit < 0 ? 'text-red-400' : 'text-slate-200'} text-[13px] sm:text font-semibold `} >{totalProfit.toFixed(2)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                            <p className='text-[10px] sm:text-xs text-slate-400' >Positions P&L</p>
                        </div>
                        <div className='text-center py-6 sm:py-4 w-1/3' >
                            <h2 className='text-[13px] sm:text font-semibold text-slate-200' >{formatNumber(margin)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                            <p className='text-[10px] sm:text-xs text-slate-400' >Portfolio Value</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sm:flex  ' >
                <div className='w-full sm:pl-3 sm:w-2/4 text-center sm:text-left my-20' >
                    <h1 className='text-4xl font-bold text-slate-100' >Portfolio<br></br> Performance</h1>
                    <p className='text-slate-300 sm:w-2/3 mt-2 text-sm opacity-80 text-center sm:text-left' >Analyze your recent trades to gain insights into your trading performance. Use this data to refine your strategies and make more informed decisions in future trades.</p>
                </div>
                {completedTrades.length>0 && <div className='w-full sm:w-2/4 border m-3 mt-24 sm:mt-3 rounded-lg border-slate-600 ml-auto' >
                    <PortfolioPerformanceGraph tradingData={last15Trades} />
                </div>}
            </div></>:''}
            <p className='text-slate-400 mt-2' >Completed Trades</p>
            <div className='mt-32 sm:mt-4' >
                {completedTrades?.length > 0 ? <>
                    {completedTrades.map((trade) => {
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

export default PortfolioComponent