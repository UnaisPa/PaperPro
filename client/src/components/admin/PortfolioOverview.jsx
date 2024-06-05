import React, { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axiosInstance'
import { toast } from 'react-toastify'
import TradingLoader from '../loader/TradingLoader'
import formatNumber from '../../helper/formatNumber'
import PortfolioPerformanceGraph from '../performanceChart'
import PortfolioComponent from '../PortfolioComponent'
import { MdHourglassEmpty } from 'react-icons/md'
import formatDate from '../../helper/formatDate'

const PortfolioOverview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false);
    const [trades, setTrades] = useState([]);
    const [profit, setProfit] = useState(0);

    const getUserDetails = () => {
        setLoading(true)
        axios.get(`/admin/portfolio_details/${id}`).then((response) => {
            console.log(response.data);
            setUser(response.data.user)
            setTrades(response.data.trades);
            setProfit(response.data.profit);
        }).catch((err) => {
            toast.error(err.response?.data?.message);
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <>
            {loading ? <TradingLoader /> :
                <div className=' m-4' >
                    <div className=' text-slate-200' >
                        <h1 className='text-xl font-semibold flex'>Portfolio Overview <BiChevronRight className='mt-1' /> {user.name}</h1>
                    </div>
                    <div className=' mt-3 sm:flex gap-2' >
                        <div className='border rounded-md border-slate-500  sm:w-1/2' >
                           { trades.length>0?<PortfolioPerformanceGraph tradingData={trades} />:<div className='text-slate-400 text-center my-40 ' >No trading data found!</div>}
                        </div>
                        <div className=' p-2 sm:w-1/2' >
                            <div className='sm:flex w-full gap-2' >
                                <div className=' border border-slate-500 rounded-md p-5 sm:w-1/2 h-28' >
                                    <p className='text-slate-400 text-xs' >Portfolio Value</p>
                                    <h1 className='text-2xl font-semibold text-slate-200 mt-2' >$ {formatNumber(user.margin)}</h1>
                                </div>
                                <div className='border-slate-500 border rounded-md p-5 sm:w-1/2 h-28' >
                                    <p className='text-slate-400 text-xs' >Total Returns</p>
                                    <h1 className={`${profit < 0 ? 'text-red-400' : profit > 0 ? 'text-green-400' : 'text-slate-200'} text-2xl font-semibold mt-2`} >$ {profit ? profit.toFixed(2) : 0}</h1>
                                </div>
                            </div>
                            <div className='sm:flex w-full mt-3  gap-2' >
                                <div className=' border rounded-md border-slate-500 p-5 sm:w-1/2 h-28' >
                                    <p className='text-slate-400 text-xs' >P&L Percentage</p>
                                    <h1 className='text-2xl font-semibold text-slate-200 mt-2' >{((profit / user.margin) * 100).toFixed(2)}%</h1>
                                </div>
                                <div className=' border rounded-md border-slate-500 p-5 sm:w-1/2 h-28' >
                                    <p className='text-slate-400 text-xs' >Total Trades</p>
                                    <h1 className='text-2xl font-semibold text-slate-200 mt-2' >{trades.length}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='text-slate-300 mt-6'  >
                            <h1>Completed Trades</h1>
                        </div>
                        {trades?.length > 0 ? <>
                            {trades.map((trade) => {
                                return (
                                    <div className='border border-gray-600 rounded-md mt-2 sm:flex' >
                                        <div onClick={(event) => { event.preventDefault(), navigate(`/symbol/${trade.stockSymbol}`) }} className=' w-full sm:w-1/2' >
                                            {/* <SingleTicker symbol={`${trade.stockSymbol}`} isTransparent colorTheme='dark' /> */}
                                            <div className='' >
                                                <div className='sm:flex  mt-10' >
                                                    <Link to={`/symbol/${trade.stockSymbol}`} ><h1 className='text-slate-200 hover:opacity-90 cursor-pointer text-2xl text-center sm:text-left  sm:ml-10 sm:mx-0 ' >{trade.companyName}</h1></Link>
                                                    <p className='ml-auto text-center mr-3 text-slate-400 text-xs' >{formatDate(trade.createdAt)}</p>
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
                </div>}
        </>

    )
}

export default PortfolioOverview