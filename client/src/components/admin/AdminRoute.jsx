import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import AdminLogin from '../../pages/admin/AdminLogin';
import LandingPage from '../../pages/LandingPage';

const AdminRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const token = localStorage.getItem('jwt');
    if(!token){
        <LandingPage />
    }
    return currentUser?.isAdmin ? <Outlet /> : <Navigate to='/' />;
}

export default AdminRoute