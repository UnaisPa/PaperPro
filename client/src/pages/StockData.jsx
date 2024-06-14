import React, { useEffect, useState, useRef, useMemo } from 'react'
import Header from '../components/Header'
 import SymbolDetails from '../components/SymbolOverview'

import { useParams } from 'react-router-dom'
import { CompanyProfile, SymbolOverview, FundamentalData, TechnicalAnalysis, Timeline } from "react-ts-tradingview-widgets"
import { useSelector, useDispatch } from 'react-redux'
import formatNumber from '../helper/formatNumber'
import { toast } from 'react-toastify'
import axios from '../axiosInstance'
import { ClipLoader } from 'react-spinners'
import { addTrade } from '../redux/positionsSlice'
import { useNavigate } from 'react-router-dom'
import { updateMargin } from '../redux/userSlice'
import isUSMarketOpen from '../helper/isUSMarketOpen'
import ErrorDialog from '../components/dialogs/ErrorDialog'
import { RiStockLine } from "react-icons/ri";
import SuccessDialog from '../components/dialogs/successDialog'
import { IoMdAdd } from "react-icons/io";

const ENDPOINT = 'ws://paperpro.site';

const StockData = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user);
    const { stock } = useParams()
    const enteredSymbol = stock.toUpperCase()
    // const symbols = ["AAPL", "GOOG", "TSLA"]
    const symbols = [enteredSymbol]
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [orderType, setOrderType] = useState('Intraday')
    const [validateErrors, setValidateErrors] = useState({});
    const priceRef = useRef(null)
    const totalRef = useRef(null)

    const [successDialogOpen,setSuccessDialogOpen] = useState(false);

    let initialData = {
        quantity: Number,
        stopLoss: 0,
        target: 0,
        // orderType:orderType,// Time frame,
        // type:activeButton, // Buy or Sell

    }
    const [formData, setFormData] = useState(initialData)

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [dialogOpen,setDialogOpen] = useState(false)


    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {
            let isMarketOpen;
            if (orderType == 'Intraday') {
                isMarketOpen = isUSMarketOpen()
            } else {
                isMarketOpen = true
            }
            console.log(orderType,isMarketOpen);
            if (isMarketOpen) {
                let timeFrame = orderType
                let type = activeButton
                const price = priceRef.current.innerText
                const symbol = enteredSymbol
                //console.log(price);
                // console.log(orderType,activeButton);

                setLoading(true);
                const userId = currentUser._id
                axios.post(`/portfolio/create_trade/${userId}`, { formData, timeFrame, type, price, symbol }).then((response) => {
                    console.log(response.data);
                    dispatch(addTrade(response.data.trade))
                    //toast.success('Stock successflly added to portfolio')
                    setSuccessDialogOpen(true)
                    dispatch(updateMargin(response.data.margin))
                    setTimeout(() => {
                        navigate('/portfolio');
                        setSuccessDialogOpen(false)
                    }, 2000)
                }).catch((err) => {
                    console.log(err);
                    toast.error(err.response?.data);
                }).finally(() => {
                    setLoading(false)
                })
            }else{
                setDialogOpen(true)
                //toast.error('Market closed')
            }


        }
    }

    const validate = (formDatas) => {

        // const mobileRegex = /^(?:\+?1[ -]?)?[0-9]{10}$/;
        const numberRegex = /^[1-9]\d*$/;
        const formErrors = {}

        if (!formDatas.quantity) {
            formErrors.quantity = "Enter Quantity"
        } else if (!numberRegex.test(formDatas.quantity)) {
            formErrors.quantity = "Enter quantity to buy"
            setTimeout(() => {
                formErrors.quantity = ''
            }, 2000)
        }


        // if (formDatas.target.trim() == "") {
        //     formErrors.target = "Username is required"
        // } else
        if (formDatas.target == 0) {
            formErrors.target = "Enter Target"
        } else if (!numberRegex.test(formDatas.target)) {
            formErrors.target = "Please provide proper target price"
            setTimeout(() => {
                formErrors.target = ''
            }, 2000)
        } else if (checkTarget == false) {
            activeButton=='Buy'?formErrors.target = 'Please Enter a price greater than current price':formErrors.target = 'Please Enter a price less than current price'
            setTimeout(() => {
                formErrors.target = ''
            }, 2000)
        }

        if (formDatas.stopLoss == 0) {
            formErrors.stopLoss = "Enter Stop loss"
        } else if (formDatas.stopLoss !== null && !numberRegex.test(formDatas.stopLoss)) {
            formErrors.stopLoss = "Please provide proper stop Loss price"
            setTimeout(() => {
                formErrors.stopLoss = ''
            }, 2000)
        } else if (checkStopLoss == false) {
            activeButton=='Buy'?formErrors.stopLoss = 'stop loss should be less than current price':formErrors.stopLoss = 'stop loss should be greater than current price';
            setTimeout(() => {
                formErrors.stopLoss = ''
            }, 2000)
        }

        // if (formDatas.password.trim() !== "" && !passwordRegex.test(formDatas.password)) {
        //     formErrors.password = "Password must be at least 8 characters long";
        // }

        setValidateErrors(formErrors);
        return formErrors;
    };

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    //const [data, setData] = useState({});
    const [checkTarget, setCheckTarget] = useState(false);
    const [checkStopLoss, setCheckStopLoss] = useState(false)
    let newData = {}
    useEffect(() => {
        const socket = new WebSocket(ENDPOINT);

        socket.onopen = () => {
            console.log('Connected to server');
            // Request real-time data based on current time
            socket.send(symbols);
        };

        socket.onmessage = (event) => {
            newData = JSON.parse(event.data);

            console.log('Received data:', newData.c);
            if(activeButton=='Buy'){
                console.log('Buyt')
                if (formData.target > newData.c) {
                    setCheckTarget(true);
                }else{
                    setCheckTarget(false);
                }
                if (formData.stopLoss < newData.c) {
                    setCheckStopLoss(true)
                }else{
                    setCheckStopLoss(false)
                }
            }else if(activeButton=='Sell'){
                console.log('sellt')

                if (formData.target < newData.c) {
                    setCheckTarget(true);
                }else{
                    setCheckTarget(false);
                }
                if (formData.stopLoss > newData.c) {
                    setCheckStopLoss(true)
                }else{
                    setCheckStopLoss(false)
                }
            }
            
            priceRef.current.innerText = newData.c.toFixed(2);

            //console.log(formData?.quantity>0);
            if (formData?.quantity > 0) {
                let totalPrice = (formData.quantity) * (newData.c.toFixed(2))
                totalRef.current.innerText = "$ " + totalPrice.toFixed(2);
            } else {
                totalRef.current.innerText = 0
            }

            // setData(newData);
            //data = newData
        };

        socket.onclose = () => {
            console.log('Disconnected from server');
        };

        return () => {
            socket.close();
        };

    }, [newData]);


    const addToWatchlist = () =>{
        const userId = currentUser._id;
        axios.post('/users/add_to_watchlist',{userId:userId,stockSymbol:enteredSymbol}).then((response)=>{
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

    //console.log(data) 
    return (
        <div>
            <Header />
            <div className='md:flex mx-auto w-11/12 sm:w-4/5  mt-10' >
                <div className=' w-full lg:w-3/5 h-96' >
                    <SymbolOverview symbols={symbols} colorTheme='dark' isTransparent autosize />
                </div>

                <div className=' w-full lg:w-2/5 ' >
                    <div className={`${(activeButton === 'Buy' || activeButton == 'Sell') && 'border-b-transparent'} border-2 border-slate-600 p-3 mx-8 h-full rounded-lg`} >
                        <div className='flex  text-slate-100 border-b border-slate-600' >
                            <button className={`${activeButton == 'Buy' && 'border-b-2 border-[#39E739] text-[#39E739]'} w-1/2 p-2 font-semibold`} onClick={() => handleButtonClick('Buy')}>Buy</button>
                            <button className={`${activeButton == 'Sell' && 'border-b-2 border-[#FF5757] text-[#FF5757]'} w-1/2 p-2 font-semibold`} onClick={() => handleButtonClick('Sell')}>Sell</button>

                        </div>
                        <div className=' mt-2' >
                            <p className='float-right m-3 w-fit px-3 rounded-2xl text-xs text-slate-400 bg-slate-700 py-0.5 bg-opacity-65' >
                                Margin: $ {formatNumber(currentUser.margin)}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className='mt-8' >
                                <label htmlFor='quantity' style={validateErrors.quantity ? { color: "rgb(194 65 12)" } : { color: 'white' }} className='text-slate-300 text-xs' >{validateErrors?.quantity ? validateErrors.quantity : "Quantity"}</label>
                                <input id='quantity' name='quantity' onChange={handleChange} type='number' placeholder='Ex: 12' className='w-full mt-2 text-slate-200 px-3 py-1 outline-none border border-slate-500 bg-transparent rounded-md' />
                            </div>
                            <div className='mt-2 flex ' >
                                <div className='mr-1' >
                                    <label htmlFor='target' style={validateErrors.target ? { color: "rgb(194 65 12)" } : { color: 'white' }} className='text-slate-300 text-xs' >{validateErrors?.target ? validateErrors.target : "Target"}</label>
                                    <input id='target' name='target' onChange={handleChange} type='number' placeholder='Ex: 12' className='w-full mt-2 text-slate-200 px-3 py-1 outline-none border border-slate-500 bg-transparent rounded-md' />
                                </div>
                                <div className='ml-1' >
                                    <label htmlFor='stopLoss' style={validateErrors.stopLoss ? { color: "rgb(194 65 12)" } : { color: 'white' }} className='text-slate-300 text-xs' >{validateErrors?.stopLoss ? validateErrors.stopLoss : "Stop Loss"}</label>
                                    <input id='stopLoss' name='stopLoss' onChange={handleChange} type='number' placeholder='Ex: 12' className='w-full mt-2 text-slate-200 px-3 py-1 outline-none border border-slate-500 bg-transparent rounded-md' />
                                </div>
                            </div>
                            <div className='flex border-b border-slate-500 mt-3 pb-1' >
                                <div className="w-1/2  rounded-md shadow-sm py-2  text-sm font-medium text-slate-300 hover:text-gray-200 focus:outline-non">
                                    Time Frame
                                </div>
                                <div className="relative w-1/2 inline-block text-left">
                                    <div>
                                        <button type='button'
                                            className="inline-flex justify-end w-full rounded-md shadow-sm  py-2 bg- text-sm font-medium text-slate-300 hover:text-gray-200 focus:outline-non"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {orderType}
                                            <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    {isOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <p
                                                    onClick={() => { setOrderType('Intraday'), setIsOpen(false) }}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    Intraday
                                                </p>
                                                <p
                                                    onClick={() => { setOrderType('Tomorrow'), setIsOpen(false) }}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    Tomorrow
                                                </p>
                                                <p
                                                    onClick={() => { setOrderType('One Week'), setIsOpen(false) }}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    One Week
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                                <p className='w-1/2 ' >
                                    Share price
                                </p>
                                <p ref={priceRef} className='w-1/2  inline-flex justify-end font-semibold' >
                                    loading..
                                </p>
                            </div>
                            <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                                <p className='w-1/2 ' >
                                    Number of Shares
                                </p>
                                <p className='w-1/2  inline-flex justify-end font-semibold' >
                                    {formData?.quantity > 0 ? formData.quantity : 0}
                                </p>
                            </div>
                            <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                                <p  className='w-1/2 ' >
                                    Estimated Cost
                                </p>
                                <p ref={totalRef} className='w-1/2  inline-flex justify-end font-semibold' >
                                    loading..
                                </p>
                            </div>

                            {activeButton && <button type='submit'
                                className={`${activeButton == 'Buy' ? 'bg-[#39E739]' : 'bg-[#FF5757]'} rounded-lg bg-opacity-35 font-semibold   mr-3  px-3.5 py-2.5 hover:text-slate-50  text-slate-300 shadow-sm hover:bg-opacity-80 w-full mt-5`}>
                                {loading ? <><ClipLoader color='white' size={15} /> Loading</> : activeButton}
                            </button>}
                        </form>
                    </div>
                </div>

            </div>
            {dialogOpen&&<ErrorDialog setDialogOpen={setDialogOpen}  />}
            {successDialogOpen && <SuccessDialog setDialogOpen={setSuccessDialogOpen} />}
            <div className='w-4/5 sm:w-4/5 mx-auto  mt-4 mb-2 sm:flex  sm:justify-between' >
                <p onClick={addToWatchlist} className='mx-auto sm:mx-0 mt-1 sm:mt-0 sm:w-1/5  text-center border border-slate-500 rounded-xl px-3 py-1 sm:mr-8 cursor-pointer text-slate-300 flex hover:opacity-85' ><IoMdAdd className=' rounded-3xl pr-1' color='white' size={20} /><span> Add to watchlist</span></p>
                <p onClick={()=>navigate(`/advanced_chart/${enteredSymbol}`)} className='mx-auto sm:mx-0 text-center w-full mt-2 sm:mt-0 sm:w-1/5 sm:mr-8  border border-slate-500 rounded-xl px-3 py-1 mr-8 cursor-pointer text-slate-300 flex hover:opacity-85' ><RiStockLine className=' rounded-3xl pr-1' color='white' size={20} /><span> Advanced Chart</span></p>
            </div>
            <div className='h-96 mx-auto w-11/12 sm:w-4/5 mt-10' >
                <CompanyProfile symbol={enteredSymbol} isTransparent autosize colorTheme='dark' />
            </div>
            <div style={{ height: '800px' }} className=' mx-auto w-11/12 sm:w-4/5 mt-10' >
                <FundamentalData symbol={enteredSymbol} isTransparent autosize colorTheme='dark' />
            </div>

            {/* <div className='w-full h-96 mt-10' >
                <TechnicalAnalysis symbol={enteredSymbol} isTransparent autosize colorTheme='dark' />

            </div> */}

        </div>
    )
}

export default StockData