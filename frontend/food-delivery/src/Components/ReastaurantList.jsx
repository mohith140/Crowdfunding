import React, { useState, useEffect } from 'react';
import './CSS/RestaurantList.css';
import { useNavigate, Link } from 'react-router-dom';

const RestaurantList = () => {
    const [edit, setEdit] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/restaurants');
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleRestaurantSubmit = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        const restaurantData = { name, address, phone };

        if (edit) {
            try {
                await fetch(`http://localhost:5000/api/admin/restaurants/${currentRestaurantId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(restaurantData)
                });
            } catch (err) {
                console.log('Error updating restaurant:', err);
            }
        } else {
            const restaurantId = document.getElementById('id').value;
            restaurantData.restaurantId = restaurantId;
            try {
                await fetch('http://localhost:5000/api/admin/restaurants', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(restaurantData)
                });
            } catch (err) {
                console.log('Error adding new restaurant:', err);
            }
        }

        resetForm();
        fetchRestaurants();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/admin/restaurants/${id}`, {
                method: 'DELETE'
            });
            setRestaurants(restaurants.filter((restaurant) => restaurant.restaurantId !== id));
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const editButton = (id) => {
        const restaurant = restaurants.find((rest) => rest.restaurantId === id);
        document.getElementById('name').value = restaurant.name;
        document.getElementById('address').value = restaurant.address;
        document.getElementById('phone').value = restaurant.phone;

        setEdit(true);
        setCurrentRestaurantId(id);
    };

    const cancelEdit = () => {
        resetForm();
    };

    const resetForm = () => {
        setEdit(false);
        setCurrentRestaurantId(null);
        document.getElementById('restaurantForm').reset();
    };

    const showMenu = (id) => {
        navigate(`/${id}/menu`);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="restaurant-list-container">
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
                </ul>
            </div>
            {/* Content Wrapper */}
            <div id="content-wrapper1" className="flex-grow-1 d-flex flex-column">
                <h2 className="restaurant-list-heading">Restaurants List</h2>
                <form id="restaurantForm" onSubmit={handleRestaurantSubmit}>
                    {!edit && <input id="id" className="form-control" type="text" placeholder="Enter Restaurant ID" />}
                    <input id="name" className="form-control" type="text" placeholder="Enter Restaurant Name" required />
                    <input id="address" className="form-control" type="text" placeholder="Enter Restaurant Address" required />
                    <input id="phone" className="form-control" type="text" placeholder="Enter Restaurant Phone" required />
                    <button type="submit">
                        {edit ? 'Edit Restaurant' : 'Add Restaurant'}
                    </button>
                    {edit && (
                        <button type="button" className="cancel-button" onClick={cancelEdit}>Cancel Edit</button>
                    )}
                </form>
                <table className="restaurant-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant.restaurantId}>
                                <td>{restaurant.restaurantId}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address}</td>
                                <td>{restaurant.phone}</td>
                                <td>
                                    <button className="action-button show-menu-button" onClick={() => showMenu(restaurant.restaurantId)}>Show Menu</button>
                                    <button className="action-button edit-button" onClick={() => editButton(restaurant.restaurantId)}>Edit</button>
                                    <button className="action-button delete-button" onClick={() => handleDelete(restaurant.restaurantId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantList;
