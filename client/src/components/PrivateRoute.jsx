import React from 'react'
import { Navigate,Outlet, } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'

const PrivateRoute = () => {
    const token = localStorage.getItem('jwt');
    const { currentUser } = useSelector((state) => state.user);

  return !token? <LandingPage/> : <Outlet/>
}

export default PrivateRoute