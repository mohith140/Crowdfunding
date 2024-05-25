import React from 'react'
import { useAuth } from '../Components/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const UserProtected = () => {
    const { user, token, role } = useAuth();
    // console.log(role)
    if (!token || user.role !== "Customer") {
        return <Navigate to="/login" />
    }
    return <Outlet />
}

export default UserProtected
