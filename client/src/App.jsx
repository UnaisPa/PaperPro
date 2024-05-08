import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import HideRoutes from "./components/HideRoutes";
import Register from "./pages/Register";
import {NextUIProvider} from "@nextui-org/react";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Stocks from "./pages/Stocks";
import { NotFound } from "./pages/NotFound";
import OtpVerification from "./pages/OtpVerification";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from "./pages/UserProfile";
import StockData from "./pages/StockData";
import SavedPosts from "./pages/SavedPosts";
import TradingLoader from "./components/loader/TradingLoader";
import EditProfile from "./pages/EditProfile";
function App() {
  const {registerPage} = useSelector((state)=>state.condRender);
  const token = localStorage.getItem('jwt');
  return (
    <>
      <NextUIProvider>
      <Router>
        <ToastContainer theme="dark" />
        <Routes>
            {/* <Route path="/" element={token?<Home/>:<LandingPage/>} /> */}
          <Route path="" element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>} />
            <Route path="/portfolio" element={<Portfolio/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/stocks" element={<Stocks/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/user/:id" element={<UserProfile/>} />
            <Route path="/symbol/:stock" element={<StockData/>} />
            <Route path="/saved_posts" element={<SavedPosts/>} />
            <Route path="/edit_profile" element={<EditProfile/>} />
          </Route>
          <Route path="" element={<HideRoutes/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={registerPage?<Register/>:<OtpVerification/>}/>
            {/* <Route path="/verification" element={<OtpVerification/>}/> */}
          </Route>
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
      </Router>
      </NextUIProvider>
    </>
  );
}

export default App;
