import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import Navbar from './Navbar';
import './CSS/UserRestaurantList.css'; // Import custom CSS for navbar styling
import { useAuth } from './AuthContext';

function UserRestaurantList() {
    const { user } = useAuth();
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

    const featuredRestaurants = restaurants.slice(0, 5); // Example: take the first 5 restaurants as featured

    return (
        <>

            <Navbar />
            <div className="container-fluid mt-5">
                <h2 className="text-center mb-4">Welcome, {user.username}!</h2>
                <h2 className="text-center mb-4">Featured Restaurants</h2>
                <div className="d-flex justify-content-center mb-4">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search for a restaurant"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Carousel>
                    {featuredRestaurants.map(restaurant => (
                        <Carousel.Item key={restaurant.restaurantId}>
                            <img
                                className="d-block w-100"
                                src={restaurant.image || 'https://source.unsplash.com/800x400/?food,indian'}
                                alt={restaurant.name}
                            />
                            <Carousel.Caption>
                                <h3>{restaurant.name}</h3>
                                <p>{restaurant.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <h2 className="text-center mb-4">Restaurants</h2>
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
