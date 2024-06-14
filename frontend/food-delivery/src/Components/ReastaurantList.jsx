import React, { useState, useEffect } from 'react';
import './CSS/RestaurantList.css';
import { useNavigate, Link } from 'react-router-dom';

const RestaurantList = () => {
    const [edit, setEdit] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [form, setForm] = useState({ id: '', name: '', address: '', phone: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('https://foodapp-0rh9.onrender.com/api/restaurants');
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRestaurantSubmit = async (event) => {
        event.preventDefault();

        const restaurantData = { name: form.name, address: form.address, phone: form.phone };

        if (edit) {
            try {
                await fetch(`https://foodapp-0rh9.onrender.com/api/admin/restaurants/${currentRestaurantId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(restaurantData),
                });
            } catch (err) {
                console.log('Error updating restaurant:', err);
            }
        } else {
            restaurantData.restaurantId = form.id;
            try {
                await fetch('https://foodapp-0rh9.onrender.com/api/admin/restaurants', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(restaurantData),
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
            await fetch(`https://foodapp-0rh9.onrender.com/api/admin/restaurants/${id}`, {
                method: 'DELETE',
            });
            setRestaurants(restaurants.filter((restaurant) => restaurant.restaurantId !== id));
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const editButton = (id) => {
        const restaurant = restaurants.find((rest) => rest.restaurantId === id);
        setForm({ id: restaurant.restaurantId, name: restaurant.name, address: restaurant.address, phone: restaurant.phone });
        setEdit(true);
        setCurrentRestaurantId(id);
    };

    const cancelEdit = () => {
        resetForm();
    };

    const resetForm = () => {
        setEdit(false);
        setCurrentRestaurantId(null);
        setForm({ id: '', name: '', address: '', phone: '' });
    };

    const showMenu = (id) => {
        navigate(`/${id}/menu`);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="restaurant-list-container">
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
            <div id="content-wrapper1" className="flex-grow-1 d-flex flex-column">
                <h2 className="restaurant-list-heading">Restaurants List</h2>
                <form id="restaurantForm" onSubmit={handleRestaurantSubmit}>
                    {!edit && (
                        <input
                            id="id"
                            name="id"
                            className="form-control"
                            type="text"
                            placeholder="Enter Restaurant ID"
                            value={form.id}
                            onChange={handleInputChange}
                        />
                    )}
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Enter Restaurant Name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        id="address"
                        name="address"
                        className="form-control"
                        type="text"
                        placeholder="Enter Restaurant Address"
                        value={form.address}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        id="phone"
                        name="phone"
                        className="form-control"
                        type="text"
                        placeholder="Enter Restaurant Phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">
                        {edit ? 'Edit Restaurant' : 'Add Restaurant'}
                    </button>
                    {edit && (
                        <button type="button" className="cancel-button" onClick={cancelEdit}>Cancel Edit</button>
                    )}
                </form><br />
                <div className="search-bar">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by restaurant name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
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
                        {filteredRestaurants.map((restaurant) => (
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
