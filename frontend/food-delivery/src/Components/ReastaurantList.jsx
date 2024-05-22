import React, { useState, useEffect } from 'react';

// Sample data for demonstration
const orders = [
    { id: 1, restaurant: 'Restaurant A', status: 'Preparing' },
    { id: 2, restaurant: 'Restaurant B', status: 'Delivered' },
    { id: 3, restaurant: 'Restaurant C', status: 'On the way' },
];

const RestaurantList = () => {
    const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        // Fetch user's orders from the server
        setUserOrders(orders);
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Welcome, {user.name}</h1>
            <h2>Your Orders</h2>
            <div className="order-list">
                {userOrders.map(order => (
                    <div key={order.id} className="order-item">
                        <p>Order ID: {order.id}</p>
                        <p>Restaurant: {order.restaurant}</p>
                        <p>Status: {order.status}</p>
                    </div>
                ))}
            </div>
            <h2>Recommended Restaurants</h2>
            <div className="recommended-restaurants">
                {/* Display recommended restaurants */}
                <p>Restaurant X</p>
                <p>Restaurant Y</p>
                <p>Restaurant Z</p>
            </div>
            <h2>User Profile</h2>
            <div className="user-profile">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    );
};

export default RestaurantList;
