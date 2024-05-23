import React, { useEffect, useState } from 'react'
import { SingleTicker, MiniChart } from "react-ts-tradingview-widgets"
import { MdOutlineBookmarkRemove } from "react-icons/md"
import axios from '../axiosInstance'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
const WatchlistComponent = () => {
    const {currentUser} = useSelector((state)=>state.user);
    useEffect(() => {
        getWatchlistStocks();
        console.log('HI')
    }, [])

    const [stocks, setStocks] = useState([])
    const getWatchlistStocks = () => {
        const id = currentUser._id
        axios.get(`/users/get_watchlist/${id}`).then((response) => {
            if (response.data.success) {
                setStocks(response.data.stocks);
            }
            console.log(response.data)
        }).catch((err) => {
            toast.error(err.response?.data ? err.response.data.message : err.message);
            console.log(err);
        })
    }
    return (
        <div className="mt-4 p-1 border-t border-slate-500  rounded-md w-full" >
            <h1 className='text-slate-400 my-3' >Watchlist</h1>
            {stocks.length >= 0 ? <>
                {stocks.map((stock) => {
                    return (
                        <div key={stock._id} className='border mt-1.5 rounded-md border-slate-500 flex justify-between' >
                            <SingleTicker symbol={stock.symbol} isTransparent colorTheme='dark' />
                            <div className=' w-1/2 sm:w-1/3 ' >
                                <h1 className=' mt-3 mx-2 float-right cursor-pointer text-slate-200 hover:bg-slate-700 rounded-full p-2' ><MdOutlineBookmarkRemove size={20} /></h1>
                                <h1 className=' mt-10 text-xl font-semibold pl-3' >{stock.symbol}</h1>
                                <p className='text-xs pl-3 opacity-80 hover:opacity-100 cursor-pointer' >Stock Details</p>
                            </div>
                        </div>
                    )
                })}
            </> : <div className='text-center my-3' >
                <p>No stocks found in your watchlist.</p>
            </div>}
        </div>
    )
}

export default WatchlistComponent