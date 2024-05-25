import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './CSS/AdminDashboard.css';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [completed, setCompleted] = useState('');
    const [cancelled, setCancelled] = useState('');
    const [newOrders, setNewOrders] = useState('');
    const [pendingRequests, setPendingRequests] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            console.log(data)
            const preq = data.filter(data => data.status === 'pending');
            const creq = data.filter(data => data.status === 'completed');
            const cnreq = data.filter(data => data.status === 'cancelled');
            setCompleted(creq.length);
            setCancelled(cnreq.length);
            setNewOrders(data.length);
            setPendingRequests(preq.length);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="admin-dashboard">
            <div id="wrapper" className="d-flex">
                {/* Sidebar */}
                <div className="bg-primary sidebar text-white p-3">
                    <h3 className="text-center mb-4">Quick Bite</h3>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="/orders" className="nav-link text-white">Orders</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="/restaurants" className="nav-link text-white">Restaurants</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <button className="nav-link text-white btn btn-link" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>

                {/* Content Wrapper */}
                <div id="content-wrapper1" className="flex-grow-1 d-flex flex-column">
                    {/* Main Content */}
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Welcome, {user.username}!</h1>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        </div>

                        <div className="row">
                            {/* Earnings (Monthly) Card */}
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Completed
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{completed}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-check-circle fa-2x text-success"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Earnings (Annual) Card */}
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                    Cancelled
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{cancelled}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-times-circle fa-2x text-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* New Orders Card */}
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    Total Orders
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{newOrders}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pending Requests Card */}
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                    Pending Requests
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingRequests}</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
