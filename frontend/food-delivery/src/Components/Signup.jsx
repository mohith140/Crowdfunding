import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import './CSS/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', mobileNumber: '', role: '' });
    const [loading, setLoading] = useState(false); // State for loading status
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await fetch('https://foodapp-0rh9.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
            navigate('/login');
        } catch (error) {
            alert(error)
            console.error('Error:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="background">
            {loading && (
                <div className="loading-overlay">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            )}
            <div className={`container ${loading ? 'blurred' : ''}`}>
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
