import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
