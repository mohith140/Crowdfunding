import React, { useState, useEffect } from 'react';
import './RestaurantList.css'
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
    const [edit, setEdit] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [id, setId] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, [restaurants]);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/restaurants');
            const data = await response.json();
            // console.log(data)
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    // const handleRestaurantSelect = (restaurant) => {
    //     setSelectedRestaurant(restaurant);
    // };

    const handleRestaurantUpdate = async (e, id1) => {
        // e.preventDefault()
        console.log(id1)
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        // Check if the form is in edit mode
        if (edit) {
            // Update existing restaurant data
            try {
                const data = { name, address, phone };
                console.log(data)
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
            // Add new restaurant
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

        // Reset edit mode and clear input fields
        setEdit(false);
        setId(null);
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('phone').value = '';
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/admin/restaurants/${id}`, {
            method: 'DELETE'
        })
        setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    }

    const handleAdd = async () => {
        var restaurantId = document.getElementById('id').value
        var name = document.getElementById('name').value
        var address = document.getElementById('address').value
        var phone = document.getElementById('phone').value

        var data = { restaurantId, name, address, phone }

        await fetch('http://localhost:5000/api/admin/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    const editButton = async (id) => {
        console.log(id)
        setEdit(true);
        setId(id);
    }

    const showMenu = (id2) => {
        navigate(`/${id2}/menu`)
    }

    return (
        <div className="restaurant-list-container">
            <h2 className="restaurant-list-heading">Restaurant List</h2>
            <form id="restaurantForm">
                {
                    edit ?
                        <></>
                        :
                        <input id="id" className='form-control' type=" text" placeholder="Enter Restaurant ID" />
                }
                <input id="name" className='form-control' type="text" placeholder="Enter Restaurant Name" />
                <input id="address" className='form-control' type="text" placeholder="Enter Restaurant Address" />
                <input id="phone" className='form-control' type="text" placeholder="Enter Restaurant Phone" />
                {
                    edit ?
                        <button onClick={() => handleRestaurantUpdate(id)}>Edit Restaurant</button>
                        :
                        <button onClick={() => handleAdd()}>Add Restaurant</button>
                }
            </form>
            <br />
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
                                <button className="action-button" onClick={() => showMenu(restaurant.restaurantId)}>Show Menu</button>
                                <button className="action-button edit-button" onClick={() => { editButton(restaurant.restaurantId) }}>Edit</button>
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
