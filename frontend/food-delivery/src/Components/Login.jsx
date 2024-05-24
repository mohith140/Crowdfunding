import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSS/Login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
            localStorage.setItem('token', result.token)
            localStorage.setItem("id", result.id);
            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                alert(result);
            }
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
                <h2 className="heading">Log In</h2>
                <form onSubmit={handleSubmit} className="form">
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
                    <button type="submit" className="button">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
