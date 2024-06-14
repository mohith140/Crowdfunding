import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import { useAuth } from './AuthContext';
import './CSS/Login.css'; // Import custom styles

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false); // State for loading status
    const navigate = useNavigate();
    const auth = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        const user = await auth.loginAction(formData);
        setLoading(false); // Stop loading

        if (user.role === "Admin") {
            navigate('/dashboard');
        } else if (user.role === "Customer") {
            navigate('/user/restaurants');
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
