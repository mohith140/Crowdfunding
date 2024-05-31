import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CSS/Login.css';
import { useAuth } from './AuthContext';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const auth = useAuth();

    // useEffect(() => {
    //     if (auth.token !== null && auth.role === "Customer")
    //         navigate("/user/restaurants")
    //     else if (auth.token !== null && auth.role === "Admin")
    //         navigate("/dashboard")

    // }, [auth.role])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await auth.loginAction(formData);
        // console.log(user)
        if (user.role === "Admin") {
            navigate('/dashboard');
        } else if (user.role === "Customer") {
            navigate('/user/restaurants');
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
