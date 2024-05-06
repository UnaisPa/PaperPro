import React, { useState } from 'react'
import Header from '../components/Header'
import SymbolDetails from '../components/SymbolOverview'
import { useParams } from 'react-router-dom'
import { CompanyProfile, SymbolOverview, FundamentalData, TechnicalAnalysis, Timeline } from "react-ts-tradingview-widgets"
const StockData = () => {
    const { stock } = useParams()
    const enteredSymbol = stock.toUpperCase()
    // const symbols = ["AAPL", "GOOG", "TSLA"]
    const symbols = [enteredSymbol]
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [orderType, setOrderType] = useState('Intraday')

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    return (
        <div>
            <Header />
            <div className='md:flex mx-auto w-11/12 sm:w-4/5  mt-10' >
                <div className=' w-full lg:w-3/5 h-96' >
                    <SymbolOverview isTransparent symbols={symbols} autosize colorTheme='dark' />
                </div>
                <div className=' w-full lg:w-2/5 ' >
                    <div className='border-2 border-slate-600 p-3 mx-8 h-96 rounded-lg' >
                        <div className='flex  text-slate-100 border-b border-slate-600' >
                            <button className={`${activeButton == 'Buy' && 'border-b-2 border-[#39E739] text-[#39E739]'} w-1/2 p-2 font-semibold`} onClick={() => handleButtonClick('Buy')}>Buy</button>
                            <button className={`${activeButton == 'Sell' && 'border-b-2 border-[#FF5757] text-[#FF5757]'} w-1/2 p-2 font-semibold`} onClick={() => handleButtonClick('Sell')}>Sell</button>

                        </div>
                        <div className=' mt-2' >
                            <p className='float-right m-3 w-fit px-3 rounded-2xl text-xs text-slate-400 bg-slate-700 py-0.5 bg-opacity-65' >
                                Margin:10,23,000.00
                            </p>
                        </div>

                        <div className='mt-8' >
                            <label className='text-slate-300 text-sm' >Quantity</label>
                            <input type='number' placeholder='Ex: 12' className='w-full mt-2 text-slate-200 px-3 py-1 outline-none border border-slate-500 bg-transparent rounded-md' />
                        </div>
                        <div className='flex border-b border-slate-500 mt-3 pb-1' >
                            <div className="w-1/2  rounded-md shadow-sm py-2  text-sm font-medium text-slate-300 hover:text-gray-200 focus:outline-non">
                                Time Frame
                            </div>
                            <div className="relative w-1/2 inline-block text-left">
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
                                Number of Shares
                            </p>
                            <p className='w-1/2  inline-flex justify-end font-semibold' >
                                12
                            </p>
                        </div>
                        <div className=' flex border-b mt-2 border-slate-500 py-2.5 w-full text-slate-300 text-sm font-medium' >
                            <p className='w-1/2 ' >
                                Estimated Cost
                            </p>
                            <p className='w-1/2  inline-flex justify-end font-semibold' >
                                12,000.00
                            </p>
                        </div>
                        {activeButton&&<button
                            className={`${activeButton=='Buy'?'bg-[#39E739]':'bg-[#FF5757]'} rounded-lg bg-opacity-35 font-semibold   mr-3  px-3.5 py-2.5 hover:text-slate-50  text-slate-300 shadow-sm hover:bg-opacity-80 w-full mt-5`}>
                            {activeButton}
                        </button>}
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