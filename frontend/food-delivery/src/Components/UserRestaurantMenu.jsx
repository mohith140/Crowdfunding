import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CSS/UserRestaurantList.css'; // Import custom CSS for navbar styling

function UserRestaurantMenu() {
    const [menus, setMenus] = useState([]);
    const [name, setName] = useState('');
    const [cart, setCart] = useState([]);

    const params = useParams();

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
            console.error('Error fetching restaurants:', error);
        }
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const placeOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart }),
            });
            const result = await response.json();
            alert('Order placed successfully!');
            setCart([]);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/user/restaurants">Quick Bite</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid mt-5">
                <h2 className="text-center mb-4">{name}'s Menu</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    {menus.map(menu => (
                        <div className="col mb-4" key={menu.itemId}>
                            <div className="card restaurant-card">
                                <img
                                    src={menu.image || 'https://via.placeholder.com/300'}
                                    className="card-img"
                                    alt={menu.name}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{menu.name}</h5>
                                    <button className="btn btn-primary" onClick={() => addToCart(menu)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cart.length > 0 && (
                    <div className="text-center mt-4">
                        <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserRestaurantMenu;
