import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [updatedStatus, setUpdatedStatus] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, [updatedStatus]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://foodapp-0rh9.onrender.com/api/admin/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatus = async (id, status) => {
        try {
            const response = await fetch(`https://foodapp-0rh9.onrender.com/api/admin/orders/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                setUpdatedStatus(status);
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="orders-container">{/* Sidebar */}
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
                </ul>
            </div>
            <h2 className="orders-heading">Orders</h2>
            {orders.map(order => (
                <div className="card order-card" key={order.orderId}>
                    <div className="order-card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Order #{order.orderId}</h5>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>
                    <div className="card-body order-card-body">
                        <div className="order-details mb-3">
                            <p><strong>Customer:</strong> {order.userId.username}</p>
                            <p><strong>Email Address:</strong> {order.userId.email}</p>
                            <p><strong>Phone:</strong> {order.userId.mobileNumber}</p>
                            <p><strong>Restaurant ID:</strong> {order.restaurantId}</p>
                            <p><strong>Items:</strong></p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>{item.quantity} x {item.name}</li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={() => handleStatus(order.orderId, 'accepted')} disabled={order.status === 'cancelled' || order.status === 'completed'}>Accept</button>
                            <button className="btn btn-success" onClick={() => handleStatus(order.orderId, 'completed')} disabled={order.status === 'cancelled'}>Completed</button>
                            <button className="btn btn-danger" onClick={() => handleStatus(order.orderId, 'cancelled')} disabled={order.status === 'completed'}>Cancel</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
