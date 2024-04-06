import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <ToastContainer theme="dark" />
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
