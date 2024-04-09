import { useState } from "react";
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

function App() {
  return (
    <>
      <NextUIProvider>
      <Router>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="" element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>} />
            <Route path="/portfolio" element={<Portfolio/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/stocks" element={<Stocks/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path="" element={<HideRoutes/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/> 
        </Routes>
      </Router>
      </NextUIProvider>
    </>
  );
}

export default App;
