import React from "react";
import LandingPageHeader from "../components/LandingPageHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <LandingPageHeader />
            <section className="p-7  w-full">
                <div className="lg:flex sm:pl-20 text-center lg:text-left mt-14 ">
                    <div className=" w-full md: ">
                        <h1 className="text-white text-4xl sm:text-5xl leading-tight  font-semibold">
                            Learn financial markets via paper trade
                        </h1>
                        <p className="text-secondary text-sm sm:text-base lg:w-4/5 mt-5">
                            SEBI reports that 90% of traders face losses and exit the market.
                            Enhance your longevity by testing strategies with our
                            user-friendly virtual trading app.
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="rounded-3xl mt-6 bg-primary px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started for free
                        </button>
                    </div>
                    <div className="mt-10 sm:mt-0 w-full lg:w-[900px]">
                        <img src="../src/assets/trader.png" />
                    </div>
                </div>
            </section>

            <section className="p-7  w-full">
                <div className="lg:flex sm:pl-20 text-center lg:text-left mt-14 ">
                    <div className=" w-full md: ">
                        <img className="opacity-80" src="../src/assets/chartsUI.png" />
                    </div>
                    <div className=" mt-10 sm:mt-0 w-full">
                        <div className="m-5 ">
                            <div className="flex">
                                <CheckCircleIcon className="text-primary" fontSize="medium" />
                                <h6 className="text-white text-xl font-semibold ml-5">
                                    Easy to use interface
                                </h6>
                            </div>
                            <p className="text-secondary opacity-80 text-xs mt-2">
                                Simple and easy-to-use interface that doesn't get in the way of
                                your learning. Navigate the markets effortlessly, focusing on
                                what matters most - your growth.
                            </p>
                        </div>
                        <hr className="ml-5 mr-5 opacity-35" />
                        <div className="m-5 ">
                            <div className="flex">
                                <CheckCircleIcon className="text-primary" fontSize="medium" />
                                <h6 className="text-white text-xl font-semibold ml-5">
                                    Frequently Updated Data
                                </h6>
                            </div>
                            <p className="text-secondary opacity-80 text-xs mt-2">
                                Stay ahead with frequently updated market data, offering you an edge in your trading strategies.
                            </p>
                        </div>
                        <hr className="ml-5 mr-5 opacity-35" />
                        <div className="m-5 ">
                            <div className="flex">
                                <CheckCircleIcon className="text-primary" fontSize="medium" />
                                <h6 className="text-white text-xl font-semibold ml-5">
                                    Unlimited Strategy Testing
                                </h6>
                            </div>
                            <p className="text-secondary opacity-80 text-xs mt-2">
                                Experiment freely with unlimited paper trades, perfecting your strategy for the real market scenario.
                            </p>
                        </div>
                        <hr className="ml-5 mr-5 opacity-35" />
                        <div className="m-5 ">
                            <div className="flex">
                                <CheckCircleIcon className="text-primary" fontSize="medium" />
                                <h6 className="text-white text-xl font-semibold ml-5">
                                    Advanced Charting Tools
                                </h6>
                            </div>
                            <p className="text-secondary opacity-80 text-xs mt-2">
                                Analyze the performance of your paper trades with detailed analytics, including profit and loss statements, win/loss ratios, and trade history.
                            </p>
                        </div>
                        <hr className="ml-5 mr-5 opacity-35" />
                        <div className="m-5 ">
                            <div className="flex">
                                <CheckCircleIcon className="text-primary" fontSize="medium" />
                                <h6 className="text-white text-xl font-semibold ml-5">
                                    Performance Analytics
                                </h6>
                            </div>
                            <p className="text-secondary opacity-80 text-xs mt-2">
                                Utilize advanced charting tools with various indicators and drawing tools to analyze market trends and make informed trading decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" p-7  w-full" >
                <div className=" text-center sm:text-left sm:mx-20" >
                    <h1 className="text-2xl font-semibold text-slate-200" >Frequently Asked Questions (FAQs)</h1>
                    <div className="mt-5" >
                        <Accordion defaultExpanded sx={{ color: 'rgb(203 213 225)', background: 'rgba(101, 109, 120, 0.301)', padding: 0, }} >
                            <AccordionSummary className="bg-transparent"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <p className="text-lg font-semibold" >What is Paper Trading?</p>
                            </AccordionSummary>
                            <AccordionDetails className="bg-transparent">
                                Paper trading is a simulated form of trading that allows beginners to practice on a virtual trading platform without using real money. It's essentially a stock market simulator where you can hone your skills before stepping into the real trading world.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{ color: 'rgb(203 213 225)', background: 'rgba(101, 109, 120, 0.301)', padding: 0, }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <p className="text-lg font-semibold" >How do I get started with paper trading?</p>
                            </AccordionSummary>
                            <AccordionDetails>

                                To get started with paper trading, first, choose a reliable paper trading platform like PaperPro. Next, set up your account and familiarize yourself with the platform's features. Begin by creating a virtual portfolio and start placing trades as you would in a real market. Lastly, monitor your trades and analyze the results to refine your strategies.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{ color: 'rgb(203 213 225)', background: 'rgba(101, 109, 120, 0.301)', padding: 0, }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <p className="text-lg font-semibold" >Is paper trading on Paperpro free?</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                Yes, paper trading on PaperPro is free. You can create a virtual portfolio and start placing trades without any cost. This allows you to practice and refine your trading strategies without risking real money. Take advantage of all the features to enhance your trading skills.
                            </AccordionDetails>

                        </Accordion>
                        <Accordion sx={{ color: 'rgb(203 213 225)', background: 'rgba(101, 109, 120, 0.301)', padding: 0, }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <p className="text-lg font-semibold" >Can I skip paper trading and start with real trading?</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                Yes, you can skip paper trading and start with real trading, but it's generally recommended to practice with paper trading first. Paper trading helps you understand market dynamics, test strategies, and gain confidence without risking real money. It’s a valuable step to minimize potential losses and improve your chances of success in real trading.
                            </AccordionDetails>

                        </Accordion>
                    </div>
                </div>
            </section>
            <section className=" p-7 sm:mt-20 w-full" >
                <div className=" text-center sm:text-left sm:mx-20" >
                    <h1 className="text-2xl font-semibold text-slate-200" >Why Should You Paper Trade?</h1>
                    <div className=" mt-7 sm:flex  text-slate-300" >
                        <div className="sm:w-1/2  rounded-lg p-8 sm:mr-1 bg-slate-500 bg-opacity-25" >
                            <h1 className="font-semibold text-lg pb-3" >Test Lab for Trading Strategies</h1>
                            <p className="text-slate-400">This is your risk-free environment to delve into different trading methods. Swing trading or shorting stocks? Our paper trading platform allows you to put these strategies to the test and refine them for real-market application.</p>
                        </div>
                        <div className="sm:w-1/2 rounded-lg mt-2 sm:mt-0  p-8 sm:ml-1 bg-slate-500 bg-opacity-25" >
                            <h1 className="font-semibold text-lg pb-3" >Risk-free Learning Playground</h1>
                            <p className="text-slate-400">Try your hand at bullish strategies, bearish tactics, or even explore the complexities of options trading. Here's the best part – it's all risk-free, giving you the freedom to learn and experiment.</p>

                        </div>
                    </div>
                    <div className=" mt-2 sm:flex  text-slate-300" >
                        <div className="sm:w-1/2  rounded-lg p-8 sm:mr-1 bg-slate-500 bg-opacity-25" >
                            <h1 className="font-semibold text-lg pb-3" >Confidence Booster</h1>
                            <p className="text-slate-400">The sense of accomplishment with every successful virtual trade can do wonders for your self-confidence. Paper trading enables you to build your courage, understanding market trends and patterns, so when you step into real-world trading, you do so with increased assurance.</p>
                        </div>
                        <div className="sm:w-1/2 rounded-lg mt-2 sm:mt-0  p-8 sm:ml-1 bg-slate-500 bg-opacity-25" >
                            <h1 className="font-semibold text-lg pb-3" >Window into Personal Trading Style</h1>
                            <p className="text-slate-400">Paper trading is more than just practice. It's a magnifying glass that helps identify your trading strengths and weaknesses. It provides you insights into your risk appetite, your patience levels, and how you react to market swings, thus paving the way for crafting your unique trading style.</p>

                        </div>
                    </div>
                </div>
            </section>
            <section className=" p-7 sm:mt-20 w-full bg-slate-950 bg-opacity-65" >
                <div className=" text-center sm:text-left sm:mx-20" >
                    <p className="text-xl font-semibold text-primary" >Paper pro</p>
                    <div className=" mt-10 p-5 rounded-lg bg-slate-800 bg-opacity-65" >
                        <p className="text-slate-200 font-medium mb-2" >FINANCIAL CONTENT DISCLAIMER</p>
                        <p className="text-slate-400 text-sm" >The content provided on PaperPro is for informational purposes only and does not constitute financial advice, endorsement, analysis, or recommendations. The content is primarily user-generated and reflects the personal opinions and experiences of PaperPro community members. We strongly advise our users to conduct their own research or consult with a qualified financial advisor before making any financial decisions. PaperPro does not guarantee the accuracy, timeliness, or completeness of any information provided by our users and will not be held responsible for any decision made based on such information. It's essential for users to approach financial discussions and decisions with caution and skepticism. Avoid any financial strategies or investments that promise unrealistically high returns or sound too good to be true. Always ensure that any financial decision aligns with your personal financial situation, goals, and risk tolerance. We do not assume any liability with respect to any loss or damage, arising directly or indirectly due to any inaccuracy or incompleteness of any information or a breach of any warranty or guarantee due to the actions of any user of the Platform</p>
                    
                    </div>  
                    <div className="mt-14 " >
                        <p className="text-slate-200 font-medium mb-2">About Paper pro</p>
                        <p className="text-slate-400 text-sm">PaperPro is a user-friendly paper trading application designed to help beginners learn about trading, the market, and new strategies. This application serves as an educational tool, providing a risk-free environment for users to practice and hone their trading skills without the fear of losing real money.
                        <br/> <br/>PaperPro is designed with simplicity in mind, making it easy for beginners to navigate and use the application. Built specifically for learning purposes, the platform allows users to experiment with different trading strategies and understand market dynamics. Users can share their experiences and insights, contributing to a rich pool of knowledge for everyone to benefit from. By simulating real market conditions, PaperPro provides users with a realistic trading experience. Additionally, the application integrates TradingView widgets, offering advanced charting tools to help users analyze market trends and make informed decisions.
                        <br/><br/>PaperPro is a solo project developed over three months by Unais P A, a full-stack developer specializing in the MERN stack. The project is inspired by some features of FrontPage and aims to provide a comprehensive learning platform for aspiring traders. </p>
                    </div> 
                </div>
                <p className="text-center text-slate-200 text-xs opacity-70 mt-16" >@<span className="text-primary">PaperPro</span> developed with inspiration ❤️</p>
            </section>
            
        </>
    );
};

export default LandingPage;
