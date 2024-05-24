import React, { useEffect, useState } from 'react'
import { SingleTicker } from "react-ts-tradingview-widgets"
import { MdOutlineBookmarkRemove } from "react-icons/md"
import axios from '../axiosInstance'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const WatchlistComponent = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        getWatchlistStocks();
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

    const removeItem = (id) => {
        axios.delete(`/users/delete_watchlist_item/${currentUser._id}?item=${id}`).then((response) => {
            const updatedStocks = stocks.filter((item) => item._id !== id);
            setStocks(updatedStocks);
            toast.success('Stock removed from watchlist');
        }).catch((err) => {
            toast.error(err.response?.data ? err.response.data.message : err.message);
            console.log(err);
        })

    }
    return (
        <div className="mt-4 p-1 border-t border-slate-500  rounded-md w-full" >
            <h1 className='text-slate-400 my-3' >Watchlist</h1>
            {stocks.length > 0 ? <>
                {stocks.map((stock) => {
                    return (
                        <div key={stock._id} className='border mt-1.5 rounded-md border-slate-500 flex justify-between' >
                            <SingleTicker symbol={stock.symbol} isTransparent colorTheme='dark' />
                            <div onClick={()=>navigate(`/symbol/${stock.symbol}`)} className=' w-1/2 sm:w-1/3 ' >
                                <h1 onClick={() => removeItem(stock._id)} className=' mt-3 mx-2 float-right cursor-pointer text-slate-200 hover:bg-slate-700 rounded-full p-2' ><MdOutlineBookmarkRemove size={20} /></h1>
                                <div className='cursor-pointer my-10  w-fit' >
                                    <h1 className=' text-xl font-semibold pl-3' >{stock.symbol}</h1>
                                    <p className='text-xs pl-3 opacity-80 hover:opacity-100 cursor-pointer' >Stock Details</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </> : <div className='text-center text-slate-200 opacity-55 my-5' >
                <MdOutlineHourglassEmpty className='mx-auto mb-3 ' size={30} />
                <p>No stocks found in your watchlist.</p>
            </div>}
        </div>
    )
}

export default WatchlistComponent