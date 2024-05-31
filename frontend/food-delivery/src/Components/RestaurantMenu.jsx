import React, { useState, useEffect } from 'react';
import './CSS/RestaurantList.css'
import { useParams, useNavigate, Link } from 'react-router-dom';

const RestaurantMenu = () => {
    const [edit, setEdit] = useState(false);
    const [menus, setMenus] = useState([]);
    const [currentMenuId, setCurrentMenuId] = useState(null);
    const [name, setName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenus();
        fetchName();
    }, []);

    const fetchName = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}`);
            const data = await response.json();
            setName(data.name);
        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchMenus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/restaurants/${params.id}/menu`);
            const data = await response.json();
            setMenus(data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };

    const handleMenuSubmit = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('desc').value;

        const menuData = { name, price, description };

        if (edit) {
            try {
                await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu/${currentMenuId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuData),
                });
            } catch (err) {
                console.log('Error updating menu:', err);
            }
        } else {
            const itemId = document.getElementById('id').value;
            menuData.itemId = itemId;
            menuData.restaurantId = params.id;
            try {
                await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(menuData),
                });
            } catch (err) {
                console.log('Error adding new menu:', err);
            }
        }

        resetForm();
        fetchMenus();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}/menu/${id}`, {
                method: 'DELETE',
            });
            setMenus(menus.filter((menu) => menu.itemId !== id));
        } catch (err) {
            console.error('Error deleting menu:', err);
        }
    };

    const resetForm = () => {
        setEdit(false);
        setCurrentMenuId(null);
        document.getElementById('menuForm').reset();
    };

    const editButton = (id) => {
        const menu = menus.find((menu) => menu.itemId === id);
        document.getElementById('name').value = menu.name;
        document.getElementById('price').value = menu.price;
        document.getElementById('desc').value = menu.description;

        setEdit(true);
        setCurrentMenuId(id);
    };

    const cancelEdit = () => {
        resetForm();
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMenus = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="restaurant-menu-container">
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
                <h2 className="restaurant-menu-heading">{name}'s Menu List</h2>
                <form id="menuForm" onSubmit={handleMenuSubmit}>
                    {!edit && <input id="id" className="form-control" type="text" placeholder="Enter Menu ID" />}
                    <input id="name" className="form-control" type="text" placeholder="Enter Item Name" required />
                    <input id="price" className="form-control" type="number" step="0.01" placeholder="Enter Item Price" required />
                    <input id="desc" className="form-control" type="text" placeholder="Enter Item Description" required />
                    <button type="submit">
                        {edit ? 'Edit Item' : 'Add Item'}
                    </button>
                    {edit && (
                        <button type="button" className="cancel-button" onClick={cancelEdit}>Cancel Edit</button>
                    )}
                    <button type="button" className="back-button" onClick={goBack}>Go Back</button>
                </form>
                <br />
                <div className="search-bar">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by item name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
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
                        {filteredMenus.map((menu) => (
                            <tr key={menu.itemId}>
                                <td>{menu.itemId}</td>
                                <td>{menu.name}</td>
                                <td>{menu.price}</td>
                                <td>{menu.description}</td>
                                <td>
                                    <button className="action-button edit-button" onClick={() => editButton(menu.itemId)}>Edit</button>
                                    <button className="action-button delete-button" onClick={() => handleDelete(menu.itemId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantMenu;
