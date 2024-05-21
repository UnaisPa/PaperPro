import React from 'react'
import { Navigate,Outlet, } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'

const PrivateRoute = () => {
    const token = localStorage.getItem('jwt');
    const { currentUser } = useSelector((state) => state.user);
    if(currentUser?.isAdmin==true){
        console.log('admin')
        return <Navigate to='/admin' />
    }
  return !token? <LandingPage/> : <Outlet/>
}

export default PrivateRoute