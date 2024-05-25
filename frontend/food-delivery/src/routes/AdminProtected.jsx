import React from 'react'
import { useAuth } from '../Components/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const AdminProtected = () => {
    const { token, role } = useAuth();
    // console.log(token, role)
    if (!token && role !== "Admin") {
        return <Navigate to="/login" />
    }
    return <Outlet />
}

export default AdminProtected
