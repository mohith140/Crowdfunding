import React, { useState, useEffect } from 'react';
import './CSS/RestaurantList.css';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
    const [edit, setEdit] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [id, setId] = useState();

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

    const handleRestaurantUpdate = async () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        if (edit) {
            try {
                const data = { name, address, phone };
                await fetch(`http://localhost:5000/api/admin/restaurants/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } catch (err) {
                console.log('Error updating restaurant:', err);
            }
        } else {
            const restaurantId = document.getElementById('id').value;
            const data = { restaurantId, name, address, phone };
            try {
                await fetch('http://localhost:5000/api/admin/restaurants', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } catch (err) {
                console.log('Error adding new restaurant:', err);
            }
        }

        setEdit(false);
        setId(null);
        document.getElementById('restaurantForm').reset();
        fetchRestaurants();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/admin/restaurants/${id}`, {
            method: 'DELETE'
        });
        setRestaurants(restaurants.filter((restaurant) => restaurant.restaurantId !== id));
    };

    const editButton = (id) => {
        setEdit(true);
        setId(id);
        const restaurant = restaurants.find((rest) => rest.restaurantId === id);
        document.getElementById('name').value = restaurant.name;
        document.getElementById('address').value = restaurant.address;
        document.getElementById('phone').value = restaurant.phone;
    };

    const showMenu = (id) => {
        navigate(`/${id}/menu`);
    };

    return (
        <div className="restaurant-list-container">
            <h2 className="restaurant-list-heading">Restaurants List</h2>
            <form id="restaurantForm">
                {!edit && <input id="id" className="form-control" type="text" placeholder="Enter Restaurant ID" />}
                <input id="name" className="form-control" type="text" placeholder="Enter Restaurant Name" />
                <input id="address" className="form-control" type="text" placeholder="Enter Restaurant Address" />
                <input id="phone" className="form-control" type="text" placeholder="Enter Restaurant Phone" />
                <button type="button" onClick={handleRestaurantUpdate}>
                    {edit ? 'Edit Restaurant' : 'Add Restaurant'}
                </button>
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
    );
};

export default RestaurantList;
