import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSS/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', mobileNumber: '', role: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.text();
            console.log(result);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="background">
            <div className="container">
                <div className="nav">
                    <Link to="/signup" className="link">Sign Up</Link>
                    <Link to="/login" className="link">Log In</Link>
                </div>
                <h2 className="heading">Sign Up</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="input"
                    />
                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
