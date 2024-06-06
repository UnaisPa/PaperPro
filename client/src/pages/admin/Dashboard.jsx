import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/admin/SideBar'
import MonthlyBarChart from '../../components/dashboard/MonthlyBarChart'
import IncomeAreaChart from '../../components/dashboard/IncomeAreaChart'
import { HiUsers } from 'react-icons/hi'
import { FaChartSimple, FaSackDollar } from "react-icons/fa6";
import { RiPieChart2Fill } from 'react-icons/ri'
import axios from '../../axiosInstance'
import { toast } from 'react-toastify'
import { setTotalTrades,setAverageProfits } from '../../redux/adminSlice'
import { useDispatch } from 'react-redux'
const Dashboard = () => {
    const dispatch = useDispatch();
    //const [totalTrades,setTotalTrades] = useState([]);
    //const [averageProfits,setAverageProfits] = useState([]);
    const [loading,setLoading] = useState(false)
    const [totalUser,setTotalUser] = useState(0);
    const [averageProfitPercentage,setAverageProfitPercentage] = useState(0);

    const [transactionsCount,setTransactionCount] = useState(0);
    const [totalProfit,setTotalProfit] = useState(0);
    //totalTrades,averageProfits,averageProfitPercentage,userCount,transactionsCount,totalProfit
    const getDashboardDetails = () =>{
        setLoading(true)
        axios.get('/admin/get_dashboard_details').then((response)=>{
            
                console.log(response.data)
                const obj = {
                    totalTrades:response.data.totalTrades.reverse(),
                    averageProfits:response.data.averageProfits.reverse()
                }
                dispatch(setTotalTrades(obj.totalTrades));
                dispatch(setAverageProfits(obj.averageProfits));
                //setTotalTrades(response.data.totalTrades.reverse());
                //setAverageProfits(response.data.averageProfits.reverse());

                setTotalProfit(response.data.totalProfit);
                setTransactionCount(response.data.transactionsCount);
                setTotalUser(response.data.userCount)
                setAverageProfitPercentage(response.data.averageProfitPercentage)
               
        }).catch((err)=>{
            toast.error(err.response?.data?.message);
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        getDashboardDetails();
    },[])

    return (
        <>
            <div className='mx-4' >
                <h1 className='text-slate-200 text-2xl font-semibold' >Dashboard</h1>
                <div className='mt-4 ' >
                    <div className='m-2 text-slate-300 gap-2  sm:flex ' >
                        <div className='border bg-slate-800 bg-opacity-70 border-slate-700 rounded-xl h-28 sm:w-1/4' >
                            <div className='flex' >
                                <div className=' p-2 pl-5 w-2/3' >
                                    <p className='opacity-80 text-sm' >Total Users</p>
                                    <h1 className='text-3xl font-semibold mt-2 ' >{totalUser}</h1>
                                </div>
                                <div className='w-1/3 ' >
                                    <div className=' p-3 m-3 bg-slate-600 bg-opacity-60 rounded-2xl' >
                                        <HiUsers className='mx-auto' size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border bg-slate-800 bg-opacity-70 border-slate-700 rounded-xl h-28 sm:w-1/4' >
                            <div className='flex' >
                                <div className=' p-2 pl-5 w-2/3' >
                                    <p className='opacity-80 text-sm' >Total Trades</p>
                                    <h1 className='text-3xl font-semibold mt-2 ' >{transactionsCount}</h1>
                                </div>
                                <div className='w-1/3 ' >
                                    <div className=' p-3 m-3 bg-slate-600 bg-opacity-60 rounded-2xl' >
                                        <FaChartSimple className='mx-auto' size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border bg-slate-800 bg-opacity-70 border-slate-700 rounded-xl h-28 sm:w-1/4' >
                            <div className='flex' >
                                <div className=' p-2 pl-5 w-2/3' >
                                    <p className='opacity-80 text-sm' >Total Returns</p>
                                    <h1 className='text-3xl font-semibold mt-2 ' >$ {totalProfit.toFixed(2)}</h1>
                                    <p className='text-[8px] w-full opacity-50' >Aggregate Profit and Loss accrued by all users.</p>
                                </div>
                                <div className='w-1/3 ' >
                                    <div className=' p-3 m-3 bg-slate-600 bg-opacity-60 rounded-2xl' >
                                        <FaSackDollar className='mx-auto' size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border bg-slate-800 bg-opacity-70 border-slate-700 rounded-xl h-28 sm:w-1/4' >
                            <div className='flex' >
                                <div className=' p-2 pl-5 w-2/3' >
                                    <p className='opacity-80 text-sm' >Average Portfolio Performance</p>
                                    <h1 className='text-3xl font-semibold mt-2 ' >{averageProfitPercentage.toFixed(2)}%</h1>
                                </div>
                                <div className='w-1/3 ' >
                                    <div className=' p-3 m-3 bg-slate-600 bg-opacity-60 rounded-2xl' >
                                        <RiPieChart2Fill  className='mx-auto' size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' mt-5 sm:flex' >
                    {loading?<div>Loading..</div>:<div className='w-full' >
                        <IncomeAreaChart  />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Dashboard