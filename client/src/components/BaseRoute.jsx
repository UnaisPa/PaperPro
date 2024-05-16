import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';

const BaseRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    // const token = localStorage.getItem('jwt');
    return currentUser?.isAdmin ? <Navigate to='/admin/dashboard' /> : <Home />;
}

export default BaseRoute