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

function App() {
  return (
    <>
      <Router>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="" element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>} />
          </Route>
          <Route path="" element={<HideRoutes/>}>
            <Route path="/login" element={<Login/>} />
          </Route> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
