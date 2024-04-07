import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


const HideRoutes = () => {
    const token = localStorage.getItem('jwt');
    const { currentUser } = useSelector((state) => state.user);

  return !token? <Outlet/> :<Navigate to='/'/>
}

export default HideRoutes