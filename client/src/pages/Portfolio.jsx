import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PostSkeleton from '../components/postSkeleton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axiosInstance';
import Axios from "axios"
import { SingleTicker } from "react-ts-tradingview-widgets"
import { MdHourglassEmpty } from "react-icons/md";

// import socketIOClient from 'socket.io-client';
// import { io } from 'socket.io-client';
import { addTrade, removeTrade, setPositions, updatePositionField, } from '../redux/positionsSlice';
import { addCompletedTrade } from '../redux/completedTradesSlice';
import { ClipLoader } from 'react-spinners';
// import { Skeleton } from '@mui/material';
// import formatDate from '../helper/formatDate';
import formatNumber from '../helper/formatNumber';
import { useNavigate } from 'react-router-dom';
import { updateMargin } from '../redux/userSlice';
import PortfolioComponent from '../components/PortfolioComponent';
// const ENDPOINT = 'ws://localhost:5050';

const Portfolio = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {trades} = useSelector(state => state.positions);
    const positions = useSelector((state) => state.positions)
    const { currentUser } = useSelector((state) => state.user);
    const TOKEN = import.meta.env.VITE_FINNHUB_API_KEY
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0)
    useEffect(() => {
        getPostionTrades();
        getTotalProfit()
    }, [])

    const getPostionTrades = async () => {
        const userId = currentUser._id;
        axios.get(`/portfolio/get_positions/${userId}`).then((response) => {
            console.log(response.data);
            dispatch(setPositions(response.data.positions));
        }).catch((err) => {
            console.log(err);
        })
    }

    const [totalPortfolioProfit, setTotalPortfolioProfit] = useState(0)
    const getTotalProfit = async () => {
        const userId = currentUser._id;
        axios.get(`/portfolio/get_total_profit/${userId}`).then((response) => {
            setTotalPortfolioProfit(response.data.totalProfit);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        //console.log(positions)
        const fetchRealTimePrice = async (symbol) => {
            const response = await Axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${TOKEN}`);
            return response.data.c;
        };
        let total = 0;
        let invested = 0
        positions.forEach((trade) => {
            total += parseFloat(trade.profit)
            invested += parseFloat(trade.totalPrice)
        })


        setTotalProfit(total);
        setTotalInvested(invested);

        const fetchCompanyName = async (symbol) => {
            const response = await Axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${TOKEN}`);
            return response.data.name
        }

        const checkTrades = async () => {

            for (let trade of positions) {
                //console.log(trade)
                const currentPrice = await fetchRealTimePrice(trade.stockSymbol);
                const profit = (currentPrice - trade.stockPrice)

                let actualProfit;
                if(trade.type=='Sell'){
                    profit<0?actualProfit=Math.abs(profit):profit>0?actualProfit=(-1 * profit):actualProfit=profit
                }else{
                    actualProfit = profit
                }

                const profitPercentage = (actualProfit / trade.stockPrice) * 100;
                const companyName = await fetchCompanyName(trade.stockSymbol);

                
                //console.log(profit);

                const updateField = { id: trade._id, field: 'profit', value: actualProfit.toFixed(2) }
                dispatch(updatePositionField(updateField))

                const updateNameField = { id: trade._id, field: 'companyName', value: companyName }
                dispatch(updatePositionField(updateNameField))


                const updateProfitPercentage = { id: trade._id, field: 'profitPercentage', value: profitPercentage }
                dispatch(updatePositionField(updateProfitPercentage))
                //dispatch(addTrade({ ...trade, profit, currentPrice }));

                if (trade.type == 'Buy') {
                    // Check target and stoploss
                    if (currentPrice >= trade.target) {
                        //call a new api to update the active filed as false in transaction model
                        axios.put(`/portfolio/update_position/${trade._id}`, { reason: 'Target hitted', profit: profit, companyName, profitPercentage, userId: currentUser._id }).then((response) => {
                            console.log('success');
                            dispatch(updateMargin(response.data.margin))
                        }).catch((err) => {
                            console.log(err)
                        })

                        dispatch(removeTrade(trade));
                        dispatch(addCompletedTrade({ ...trade, profit }));
                    }

                    if (currentPrice <= trade.stopLoss) {
                        //call a new api to update the active filed as false in transaction model
                        axios.put(`/portfolio/update_position/${trade._id}`, { reason: 'Stop Loss hitted', profit: profit, companyName, profitPercentage, userId: currentUser._id }).then((response) => {
                            console.log('success');
                            dispatch(updateMargin(response.data.margin))
                        }).catch((err) => {
                            console.log(err)
                        })

                        dispatch(removeTrade(trade));
                        dispatch(addCompletedTrade({ ...trade, profit }));
                    }
                } else if (trade.type == 'Sell') {
                    // Check target and stoploss
                    if (currentPrice <= trade.target) {
                        //call a new api to update the active filed as false in transaction model
                        axios.put(`/portfolio/update_position/${trade._id}`, { reason: 'Target hitted', profit:Math.abs(profit) , companyName, profitPercentage:profitPercentage, userId: currentUser._id }).then((response) => {
                            console.log('success');
                            dispatch(updateMargin(response.data.margin))
                        }).catch((err) => {
                            console.log(err)
                        })

                        dispatch(removeTrade(trade));
                        dispatch(addCompletedTrade({ ...trade, profit }));
                    }

                    if (currentPrice >= trade.stopLoss) {
                        //call a new api to update the active filed as false in transaction model
                        axios.put(`/portfolio/update_position/${trade._id}`, { reason: 'Stop Loss hitted', profit: (-1 * profit), companyName, profitPercentage:profitPercentage, userId: currentUser._id }).then((response) => {
                            console.log('success');
                            dispatch(updateMargin(response.data.margin))
                        }).catch((err) => {
                            console.log(err)
                        })

                        dispatch(removeTrade(trade));
                        dispatch(addCompletedTrade({ ...trade, profit }));
                    }
                }



                // Check time frame
                const now = new Date();
                const createdAt = new Date(trade.createdAt);
                const endTime = new Date(createdAt);
                if (trade.timeFrame === 'Intraday') {
                    endTime.setHours(1, 30, 0, 0); // 1:30 AM IST the next day
                    endTime.setDate(endTime.getDate() + 1); // Move to the next day
                } else if (trade.timeFrame === 'Tomorrow') {
                    endTime.setDate(createdAt.getDate() + 1);
                } else if (trade.timeFrame === 'One Week') {
                    endTime.setDate(createdAt.getDate() + 7);
                }
                if (now >= endTime) {
                    //call a new api to update the active field as false in transaction model
                    
                    axios.put(`/portfolio/update_position/${trade._id}`, { reason: 'Time period has expired', profit: actualProfit, companyName, profitPercentage, userId: currentUser._id }).then((response) => {
                        console.log('success');
                        dispatch(updateMargin(response.data.margin))
                    }).catch((err) => {
                        console.log(err)
                    })
                    dispatch(removeTrade(trade));
                    dispatch(addCompletedTrade({ ...trade, profit }));
                }
                //console.log(currentPrice,trade.target)
            }
        };

        const interval = setInterval(checkTrades, 5000); // Check every second

        return () => clearInterval(interval);

    }, [positions]);

    return (
        <>
            <Header />
            <div className="flex justify-center mt-8 w-full px-1 sm:px-5">
                <div className="w-full">
                    <Tabs >
                        <TabList className="flex">
                            <Tab
                                className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                                selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                            >
                                Positions
                            </Tab>
                            <Tab
                                className="px-4 py-2 cursor-pointer text-slate-300 focus:outline-none"
                                selectedClassName="font-semibold border-opacity-85  border-b-primary  border-b-2 text-white"
                            >
                                Portfolio
                            </Tab>

                        </TabList>
                        <TabPanel>
                            <div className="mt-4 p-1 border-t border-slate-500  rounded-md w-full">
                                <div className='sm:flex mt-4 h-20' >
                                    <div className='text-center my-4 sm:my-0' >
                                        <h1 className='text-slate-200 text-2xl font-semibold' >Positions</h1>
                                        <p className='text-slate-400' >Active Trades</p>
                                    </div>
                                    <div className='w-full sm:w-2/3 ml-auto flex' >
                                        <div className='w-2/6 mx-3 text-center py-6 sm:py-3 rounded-md bg-slate-200 bg-opacity-10' >
                                            <h2 className='text-[15px] sm:text-xl font-semibold text-green-400' >{totalProfit.toFixed(2)} <span className='text-[9px] sm:text-xs' >USD</span></h2>
                                            <p className='text-[10px] sm:text-sm text-slate-400' >Positions P&L</p>
                                        </div>
                                        <div className='flex w-full rounded-md bg-slate-200 bg-opacity-10' >
                                            <div className='text-center py-6 sm:py-4 w-1/3' >
                                                <h2 className={`${(totalPortfolioProfit) > 0 ? "text-green-400" : (totalPortfolioProfit) < 0 ? "text-red-400" : "text-slate-200"} text-[13px] sm:text font-semibold`}  >{totalPortfolioProfit.toFixed(2)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                                                <h2 className={`${(totalPortfolioProfit) > 0 ? "text-green-400" : (totalPortfolioProfit) < 0 ? "text-red-400" : "text-slate-200"} text-[9px] sm:text-[10px]`}  >{((parseFloat(totalPortfolioProfit) / 1000000) * 100).toFixed(2)} <span className='text-[9px] sm:text-xs'  >%</span></h2>

                                                <p className='text-[10px] sm:text-xs text-slate-400' >Past P&L</p>
                                            </div>
                                            <div className='text-center py-6 sm:py-4 w-1/3' >
                                                <h2 className='text-[13px] sm:text font-semibold text-slate-300' >{formatNumber(currentUser.margin)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                                                <p className='text-[10px] sm:text-xs text-slate-400' >Total Margin</p>
                                            </div>
                                            <div className='text-center py-6 sm:py-4 w-1/3' >
                                                <h2 className='text-[13px] sm:text font-semibold text-green-400' >{formatNumber(totalInvested)} <span className='text-[9px] sm:text-xs'  >USD</span></h2>
                                                <p className='text-[10px] sm:text-xs text-slate-400' >Invested Amount</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-32 sm:mt-4' >
                                    {positions?.length > 0 ? <>
                                        {positions.map((trade) => {
                                            return (
                                                <div className='border border-gray-600 rounded-md mt-2 sm:flex' >
                                                    <div onClick={(event) => { event.preventDefault(), navigate('/symbol/aapl') }} className='z-50' >
                                                        <SingleTicker symbol={`${trade.stockSymbol}`} isTransparent colorTheme='dark' />
                                                    </div>
                                                    <div className=' w-full sm:flex' >
                                                        <div className='border-l border-gray-600 w-full sm:w-1/4 text-center my-2 sm:my-10' >
                                                            <p className={`${trade.profit > 0 ? "text-green-400" : trade.profit < 0 ? "text-red-400" : "text-slate-200"} text-2xl font-semibold`} >{trade.profit === 0 ? <><ClipLoader color='grey' size={20} /></> : <>{trade.profit} <span className='text-xs' >USD</span></>}</p>
                                                            <p className={`${trade.profit > 0 ? "text-green-400" : trade.profit < 0 ? "text-red-400" : "text-slate-200"} opacity-80 `} >{trade.profit === 0 ? <> <span className='text-[9px]' >Loading..</span></> : <>{trade.profitPercentage > 0 ? "+" + trade.profitPercentage.toFixed(2) : trade.profitPercentage.toFixed(2)} <span className='text-xs' >%</span></>}</p>
                                                            <p className='text-xs text-slate-400 opacity-85' >P&L</p>
                                                        </div>
                                                        <div className='w-full  sm:w-1/4 py-5 sm:my-10 text-center' >
                                                            <p className={`text-slate-200 opacity-80 `} >{trade.target === 0 ? <> <span className='text-[9px]' >Loading..</span></> : <>{trade.target.toFixed(2)} <span className='text-xs' >USD</span></>}</p>
                                                            <p className='text-xs text-slate-400 opacity-85' >Target</p>
                                                        </div>
                                                        <div className='w-full sm:w-1/4 py-5 sm:my-10 text-center' >
                                                            <p className={`text-slate-200 opacity-80 `} >{trade.stopLoss === 0 ? <> <span className='text-[9px]' >Loading..</span></> : <>{trade.stopLoss.toFixed(2)} <span className='text-xs' >USD</span></>}</p>
                                                            <p className='text-xs text-slate-400 opacity-85' >Stop Loss</p>
                                                        </div>
                                                        <div className='w-full text-center sm:text-left sm:w-1/4 py-5 pl-2 sm:my-7 ' >
                                                            <p className='text-slate-300 text-sm' > Invested Amount : <span className='font-semibold'>{trade.totalPrice}<span className='text-[7px]' > USD</span></span></p>
                                                            <p className='text-slate-300 text-sm' > Quantitity : <span className='font-semibold' >{trade.quantity}</span><span className={`${trade.type=='Buy'?'text-green-400':'text-red-400'} ml-2`} >({trade.type})</span></p>
                                                            <p onClick={() => navigate(`/symbol/${trade.stockSymbol}`)} className='text-blue-400 hover:text-blue-200 cursor-pointer text-xs mt-1' >View Stock Details</p>

                                                        </div>

                                                        {/* <h1>{trade.stockSymbol}</h1> */}
                                                        {/* <h2 className='text-white'>{trade.companyName}</h2> */}

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </> : <>
                                        <div className='text-slate-400 mt-20' >
                                            <MdHourglassEmpty size={28} className='mx-auto' />
                                            <p className='text-center mt-1' >No open positions</p>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <PortfolioComponent totalPortfolioProfit={totalPortfolioProfit} margin={currentUser.margin} totalProfit={totalProfit} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

        </>
    );
};

export default Portfolio;