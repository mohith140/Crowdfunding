import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/orders');
            const data = await response.json();
            console.log(orders)
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusUpdate = async (orderId, status) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="orders-container">
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
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Address:</strong> {order.customerAddress}</p>
                            <p><strong>Phone:</strong> {order.customerPhone}</p>
                            <p><strong>Restaurant ID:</strong> {order.restaurantId}</p>
                            <p><strong>Items:</strong></p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.id}>{item.quantity} x {item.name}</li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                        </div>
                        <div className="order-actions">
                            {order.status === 'Pending' && (
                                <>
                                    <button className="btn btn-success" onClick={() => handleStatusUpdate(order.id, 'Completed')}>Mark as Completed</button>
                                    <button className="btn btn-danger" onClick={() => handleStatusUpdate(order.id, 'Cancelled')}>Cancel Order</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
