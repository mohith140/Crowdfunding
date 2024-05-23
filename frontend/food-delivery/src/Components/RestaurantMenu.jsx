import React, { useState, useEffect } from 'react';
import './RestaurantList.css'
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
    const [edit, setEdit] = useState(false);
    const [menus, setMenus] = useState([]);
    const [id, setId] = useState();

    const params = useParams();

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/restaurants/${params.id}/menu`);
            const data = await response.json();
            console.log(data)
            setMenus(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleMenuUpdate = async (e, id1) => {
        var name = document.getElementById('name').value
        var price = document.getElementById('price').value
        var description = document.getElementById('desc').value

        // Check if the form is in edit mode
        if (edit) {
            // Update existing restaurant data
            try {
                var data = { name, price, description };
                console.log(data)
                await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu/${id1}`, {
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
            const data = { restaurantId, name, price, description };
            try {
                await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu`, {
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
        document.getElementById('price').value = '';
        document.getElementById('desc').value = '';
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu/${id}`, {
            method: 'DELETE'
        })
        setMenus(menus.filter((menu) => menu.id !== id));
    }

    const handleAdd = async () => {
        var itemId = document.getElementById('id').value
        var name = document.getElementById('name').value
        var price = document.getElementById('price').value
        var description = document.getElementById('desc').value

        var data = { itemId, name, price, description, restaurantId: params.id }

        await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu`, {
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

    return (
        <div className="restaurant-list-container">
            <h2 className="restaurant-list-heading">Menu List</h2>
            <form id="restaurantForm">
                {
                    edit ?
                        <></>
                        :
                        <input id="id" className='form-control' type=" text" placeholder="Enter Menu ID" />
                }
                <input id="name" className='form-control' type="text" placeholder="Enter Item Name" />
                <input id="price" className='form-control' type="text" placeholder="Enter Item Price" />
                <input id="desc" className='form-control' type="text" placeholder="Enter Item Description" />
                {
                    edit ?
                        <button onClick={() => handleMenuUpdate(id)}>Edit Menu</button>
                        :
                        <button onClick={() => handleAdd()}>Add Menu</button>
                }
            </form>
            <br />
            <table className="restaurant-table">
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.itemId}>
                            <td>{menu.itemId}</td>
                            <td>{menu.name}</td>
                            <td>{menu.price}</td>
                            <td>{menu.description}</td>
                            <td>
                                <button className="action-button edit-button" onClick={() => { editButton(menu.itemId) }}>Edit</button>
                                <button className="action-button delete-button" onClick={() => handleDelete(menu.itemId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantMenu;
