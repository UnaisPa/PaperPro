import React from "react";
import LandingPageHeader from "../components/LandingPageHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
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
          <div className="border w-full md: ">
            <img className="opacity-80" src="../src/assets/chartsUI.png" />
          </div>
          <div className="border mt-10 sm:mt-0 w-full">
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
            <hr className="ml-5 mr-5" />
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
            <hr className="ml-5 mr-5" />
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
          </div>
        </div>
      </section>

      <section></section>
    </>
  );
};

export default LandingPage;
