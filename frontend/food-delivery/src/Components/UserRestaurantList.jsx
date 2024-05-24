import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/UserRestaurantList.css'; // Import custom CSS for navbar styling

function UserRestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <h2 className="text-center mb-4">Restaurants</h2>
                <div className="d-flex justify-content-center mb-4">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search for a restaurant"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-5">
                    {filteredRestaurants.map(restaurant => (
                        <div className="col mb-4" key={restaurant.restaurantId}>
                            <div className="card restaurant-card">
                                <img
                                    src={restaurant.image || 'https://source.unsplash.com/300x300/?food,indian'}
                                    className="card-img"
                                    alt={restaurant.name}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <Link to={`/user/restaurants/${restaurant.restaurantId}/menu`} className="btn btn-primary">
                                        View Menu
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserRestaurantList;
