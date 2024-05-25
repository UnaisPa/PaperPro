import React, { useRef } from 'react';
import { useState } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { HiBell } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { HiXMark, HiBars3, HiHome } from "react-icons/hi2"
import { BiChevronDown } from 'react-icons/bi';
import Header from '../components/Header';
import { TbPointFilled } from "react-icons/tb";
import { RiStockFill } from "react-icons/ri";
import { MdBarChart } from "react-icons/md";

const navigation = [
    { name: 'Paper pro', href: '#paper_pro', icon: HiHome, current: true },
    { name: 'Why paper trading', href: '#why_paper_trading', icon: RiStockFill, current: false },
    { name: 'How to Trade', href: '#', icon: MdBarChart, current: false },
    { name: 'Calendar', href: '#', icon: HiBell, current: false },
    { name: 'Documents', href: '#', icon: HiBell, current: false },
    { name: 'Reports', href: '#', icon: HiBell, current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}



export default function Tutorial() {
    const [current, setCurrent] = useState('Paper pro');
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const paperProRef = useRef();
    const whyPaperTradingRef = useRef();
    const howToTrade = useRef();

    const handleSectionClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <Header />
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-body pt-5 pb-4">
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <HiXMark className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <a

                                                key={item.name}
                                                onClick={() => setCurrent(item.name)}
                                                className={classNames(
                                                    current == item.name
                                                        ? ' text-slate-50'
                                                        : ' hover:text-slate-200',
                                                    'group flex items-center text-slate-400 px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        current == item.name ? 'text-slate-50' : 'text-gray-400 group-hover:text-slate-200',
                                                        'mr-4 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-body lg:pt-5 lg:pb-4">
                <div className="mt-20 flex flex-1 flex-col overflow-y-auto">
                    <nav className="flex-1 space-y-1 px-2 pb-4">
                        {navigation.map((item) => (

                            <p


                                to={item.href}

                                key={item.name}
                                onClick={() => { setCurrent(item.name), handleSectionClick(item.name=='Paper pro'?paperProRef:item.name=='Why paper trading'?whyPaperTradingRef:item.name=='How to Trade'?howToTrade:'') }}
                                className={classNames(
                                    current == item.name
                                        ? ' text-slate-50'
                                        : ' hover:text-slate-200',
                                    'group flex items-center cursor-pointer text-slate-400 px-2 py-2 text-base font-medium rounded-md'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        current == item.name ? 'text-slate-50' : 'text-gray-400 group-hover:text-slate-200',
                                        'mr-4 h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </p>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main column */}
            <div className="flex flex-col lg:pl-64">
                

                <main className="" ref={paperProRef} >
                    <div className="py-12 "  ref={paperProRef} >
                        <div className="mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-slate-200">Welcome to <span className='text-primary' >Paper pro</span></h1>
                        </div>
                        <div className="mx-auto max-w-7xl  sm:flex px-4 sm:px-6 md:px-8">
                            <div className='sm:w-2/3 '>
                                <p className='text-slate-300 opacity-80 mt-5 leading-6 ' >PaperPro is an awesome, user-friendly paper trading application designed to provide a seamless and realistic trading experience. Whether you're a beginner looking to learn the ropes or an experienced trader testing new strategies, PaperPro offers a comprehensive platform to meet your needs.</p>
                                <div className='flex text-slate-300 mt-9' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Risk-Free Learning: </span> Hone your trading skills in a simulated environment without jeopardizing real capital.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Live Market Dynamics: </span>Experience the intricacies of the market using real-time data, fostering a realistic learning experience.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Strategic Development: </span>Formulate and test trading strategies in a safe space, allowing for iterative refinement.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Intuitive Interface: </span>Navigate the platform seamlessly with our user-friendly interface, maximizing your learning efficiency.</p>
                                </div>
                            </div>
                            <div className='hidden sm:block w-1/3' >
                                <img src='../src/assets/chartsUI.png' />
                            </div>
                        </div>
                    </div>
                    <div className="py-12 " ref={whyPaperTradingRef} >
                        <div className="mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-slate-200">Why Paper trading?</h1>
                        </div>
                        <div className="mx-auto max-w-7xl  sm:flex px-4 sm:px-6 md:px-8">
                            <div className=' '>
                                <p className='text-slate-300 opacity-80 mt-5 leading-6 ' >Paper trading is a simulated trading process where individuals can practice buying and selling financial instruments without risking real money. It allows traders to test their strategies, understand market dynamics, and gain experience before entering the live markets.
                                </p>
                                <p className='text-slate-300 opacity-80 mt-5 leading-6 ' >Paper trading involves creating a virtual account where trades are executed using simulated capital. The process mimics real trading conditions, providing a risk-free environment to learn and practice trading skills.</p>
                                <p className='text-slate-300 opacity-80 mt-8 leading-6 font-semibold'>Importance of Paper Trading</p>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Risk-Free Learning: </span> Allows beginners to understand trading mechanics without financial risk.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Strategy testing: </span>Enables experienced traders to test new strategies in a real-time environment.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Emotional Management: </span>Helps in understanding and managing emotions like fear and greed that can affect trading decisions.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Performance Tracking: </span>Provides a way to track and analyze performance over time, leading to continuous improvement.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="py-12 " ref={howToTrade} >
                        <div className="mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-slate-200">How to Trade?</h1>
                        </div>
                        <div className="mx-auto max-w-7xl  sm:flex px-4 sm:px-6 md:px-8">
                            <div className=' '>
                                <p className='text-slate-300 opacity-80 mt-5 leading-6 ' >This tutorial will guide you through the exciting world of stock trading, all in a safe, simulated environment. You'll learn the ropes, develop winning strategies, and build the confidence to become a successful investor, without risking a single penny.

                                </p>
                                <p className='text-slate-300 my-3 opacity-80' >Ready to dive in? Let's get started!</p>
                                <p className='text-slate-300 opacity-80 mt-8 leading-6 font-semibold'>Understanding the Basics:</p>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Stocks: </span>Companies offer ownership pieces called shares, also known as stocks. When you buy a stock, you're essentially buying a small part of that company.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >The market: </span>This is where stocks are bought and sold. Prices fluctuate constantly based on supply and demand. Your goal is to buy low and sell high to make a profit.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Orders: </span>These are instructions you send to the market to buy or sell a stock at a specific price or under certain conditions.</p>
                                </div>
                                <p className='text-slate-300 opacity-80 mt-8 leading-6 font-semibold'>Key trading concepts</p>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Technical Analysis: </span>Studying past price charts and market indicators to predict future price movements.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Fundamental Analysis: </span>Researching a company's financial health, industry trends, and overall prospects to assess its long-term value.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Risk Management: </span>Setting stop-loss orders to limit potential losses and diversifying your portfolio to minimize risk.</p>
                                </div>

                                <p className='text-slate-300 opacity-80 mt-8 leading-6 font-semibold'>Paper Trading in Action</p>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Get Your Virtual Funds: </span>You'll receive a starting virtual balance (e.g., $100,000) to trade with within the app.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Select stock: </span>Select a specific stock from <span onClick={()=>navigate('/stocks')} className='cursor-pointer text-blue-400 opacity-90' >Stocks</span> page. </p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Craft Your Strategy: </span>Decide on your trading style (short-term, long-term) based on your risk tolerance, and set entry/exit points for your trades within the app.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Execute Your Trades: </span>Place market or limit orders to buy or sell stocks based on your strategy using our intuitive interface.</p>
                                </div>
                                <div className='flex text-slate-300 mt-4' >
                                    <TbPointFilled />
                                    <p className='text-sm w-2/3 opacity-80' ><span className='font-semibold text-slate-50' >Track Your Progress: </span>Monitor your simulated portfolio's value and analyze your trades within the app to learn from your successes and mistakes.</p>
                                </div>
                                <p className='text-sm text-slate-400 mt-7 w-full opacity-80' >Remember: This is your paper trading playground! Don't be afraid to experiment and make mistakes. That's how you learn and refine your strategies to become a more confident trader.</p>

                                
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
