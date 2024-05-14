import React, { useEffect, useState ,useRef} from 'react'
import Header from '../components/Header'
import SymbolDetails from '../components/SymbolOverview'
import { useParams } from 'react-router-dom'
import { CompanyProfile, SymbolOverview, FundamentalData, TechnicalAnalysis, Timeline } from "react-ts-tradingview-widgets"
import { useSelector, useDispatch } from 'react-redux'
import formatNumber from '../helper/formatNumber'
import { toast } from 'react-toastify'
const ENDPOINT = 'ws://localhost:5050';
const StockData = () => {
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

    let initialData = {
        quantity: Number,
        stopLoss: null,
        target: null,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length == 0) {


            console.log(formData);
            console.log(orderType,activeButton);
        }
    }

    const validate = (formDatas) => {

        // const mobileRegex = /^(?:\+?1[ -]?)?[0-9]{10}$/;
        const numberRegex = /^[1-9]\d*$/;
        const formErrors = {}

        if (!formDatas.quantity) {
            formErrors.quantity = "Enter Quantity"
        } else if (!numberRegex.test(formDatas.quantity)) {
            formErrors.quantity = "Please enter proper quantity"
            setTimeout(() => {
                formErrors.quantity = null
            }, 2000)
        }


        // if (formDatas.target.trim() == "") {
        //     formErrors.target = "Username is required"
        // } else

        if (formDatas.target!==null && !numberRegex.test(formDatas.target)) {
            formErrors.target = "Please provide proper target price"
            setTimeout(() => {
                formErrors.target = null
            }, 2000)
        }

        if ( formDatas.stopLoss!==null && !numberRegex.test(formDatas.stopLoss)) {
            formErrors.stopLoss = "Please provide proper stop Loss price"
            setTimeout(() => {
                formErrors.stopLoss = null
            }, 2000)
        }

        // if (formDatas.password.trim() !== "" && !passwordRegex.test(formDatas.password)) {
        //     formErrors.password = "Password must be at least 8 characters long";
        // }

        setValidateErrors(formErrors);
        return formErrors;
    };

    
    //const [data, setData] = useState({});
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

            priceRef.current.innerText = newData.c.toFixed(2);
            
            //console.log(formData?.quantity>0);
            if(formData?.quantity>0){
                let totalPrice = (formData.quantity) * (newData.c.toFixed(2))
                totalRef.current.innerText = totalPrice.toFixed(2);
            }else{
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

    //console.log(data) 
    return (
        <div>
            <Header />
            <div className='md:flex mx-auto w-11/12 sm:w-4/5  mt-10' >
                <div className=' w-full lg:w-3/5 h-96' >
                    <SymbolOverview isTransparent symbols={symbols} autosize colorTheme='dark' />
                </div>

                <div className=' w-full lg:w-2/5 ' >
                    <div className={`${(activeButton ==='Buy' ||activeButton=='Sell') && 'border-b-transparent'} border-2 border-slate-600 p-3 mx-8 h-96 rounded-lg`} >
                        <div className='flex  text-slate-100 border-b border-slate-600' >
                            <button className={`${activeButton == 'Buy' && 'border-b-2 border-[#39E739] text-[#39E739]'} w-1/2 p-2 font-semibold`} onClick={() => handleButtonClick('Buy')}>Buy</button>
                            <button className={`${activeButton == 'Sell' && 'border-b-2 border-[#FF5757] text-[#FF5757]'} w-1/2 p-2 font-semibold`} onClick={() =>toast.warning('The sell functionality is currently under development.')}>Sell</button>

                        </div>
                        <div className=' mt-2' >
                            <p className='float-right m-3 w-fit px-3 rounded-2xl text-xs text-slate-400 bg-slate-700 py-0.5 bg-opacity-65' >
                                Margin: $ {formatNumber(currentUser.margin)}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className='mt-8' >
                                <label style={validateErrors.quantity && { color: "rgb(194 65 12)" }} className={`text-slate-300 text-sm`} >{validateErrors?.quantity? validateErrors.quantity: "Quantity"}</label>
                                <input name='quantity' onChange={handleChange} type='number' placeholder='Ex: 12' className='w-full mt-2 text-slate-200 px-3 py-1 outline-none border border-slate-500 bg-transparent rounded-md' />
                            </div>
                            <div className='flex border-b border-slate-500 mt-3 pb-1' >
                                <div className="w-1/2  rounded-md shadow-sm py-2  text-sm font-medium text-slate-300 hover:text-gray-200 focus:outline-non">
                                    Time Frame
                                </div>
                                <div className="relative w-1/2 inline-block text-left">
                                    <div>
                                    <button
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
                                    
                                </p>
                            </div>
                            <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                                <p className='w-1/2 ' >
                                    Number of Shares
                                </p>
                                <p className='w-1/2  inline-flex justify-end font-semibold' >
                                    {formData?.quantity>0?formData.quantity:0}
                                </p>
                            </div>
                            <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                                <p className='w-1/2 ' >
                                    Estimated Cost
                                </p>
                                <p ref={totalRef} className='w-1/2  inline-flex justify-end font-semibold' >
                                    loading..
                                </p>
                            </div>

                            {activeButton && <button type='submit'
                                className={`${activeButton == 'Buy' ? 'bg-[#39E739]' : 'bg-[#FF5757]'} rounded-lg bg-opacity-35 font-semibold   mr-3  px-3.5 py-2.5 hover:text-slate-50  text-slate-300 shadow-sm hover:bg-opacity-80 w-full mt-5`}>
                                {activeButton}
                            </button>}
                        </form>
                    </div>
                </div>

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