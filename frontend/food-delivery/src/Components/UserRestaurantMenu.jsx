import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';  // Import uuid library for generating unique order IDs
import './CSS/UserRestaurantList.css'; // Import custom CSS for navbar styling
import { useAuth } from './AuthContext';

function UserRestaurantMenu() {
    const [menus, setMenus] = useState([]);
    const [name, setName] = useState('');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurantId, setRestaurantId] = useState('');

    const params = useParams();
    const auth = useAuth();
    let userId = auth.user;

    useEffect(() => {
        fetchMenus();
        fetchName();
    });

    const fetchName = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/restaurants/${params.id}`);
            const data = await response.json();
            setName(data.name);
        } catch (err) {
            console.log('Error fetching restaurant name:', err);
        }
    };

    const fetchMenus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/restaurants/${params.id}/menu`);
            const data = await response.json();
            setMenus(data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const addToCart = (item) => {
        setRestaurantId(item.restaurantId);
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.itemId === item.itemId);
            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCart(prevCart => prevCart.map(item =>
            item.itemId === itemId ? { ...item, quantity: item.quantity + quantity } : item
        ).filter(item => item.quantity > 0));
    };

    const placeOrder = async () => {
        const orderId = uuidv4();  // Generate a unique order ID using uuid
        const totalPrice = getTotalPrice();
        const orderDate = new Date().toISOString();  // Ensure date is in ISO string format

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, items: cart, totalPrice, orderDate, restaurantId, userId }),
            });
            const result = await response.json();
            console.log(result);
            alert('Order placed successfully!');
            setCart([]);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const filteredMenus = menus.filter(menu =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid mt-5">
                <h2 className="text-center mb-4">{name}'s Menu</h2>
                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for an item"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    {filteredMenus.map(menu => (
                        <div className="col mb-4" key={menu.itemId}>
                            <div className="card restaurant-card">
                                <img
                                    src={menu.image || 'https://via.placeholder.com/300'}
                                    className="card-img"
                                    alt={menu.name}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{menu.name}</h5>
                                    <p className="card-text">&#8377; {menu.price}</p>
                                    <button className="btn btn-primary" onClick={() => addToCart(menu)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cart.length > 0 && (
                    <div className="cart-summary mt-4">
                        <h3 className="text-center">Cart Summary</h3>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.itemId}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377; {item.price}</td>
                                            <td>&#8377; {item.price * item.quantity}</td>
                                            <td>
                                                <button className="btn btn-secondary btn-sm me-2" onClick={() => updateQuantity(item.itemId, -1)}>-</button>
                                                <button className="btn btn-secondary btn-sm me-2" onClick={() => updateQuantity(item.itemId, 1)}>+</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.itemId)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center mt-4">
                            <h4>Total Price: &#8377; {getTotalPrice()}</h4>
                            <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserRestaurantMenu;
