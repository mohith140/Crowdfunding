import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', mobileNumber: '', role: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Signup data:', formData);
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
        <div style={styles.container}>

            <div style={styles.nav}>
                <Link to="/signup" style={styles.link}>Sign Up</Link>
                <Link to="/login" style={styles.link}>Log In</Link>
            </div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    // value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    // value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    // value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type='text'
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    // value={formData.mobile}
                    onChange={handleChange}
                    style={styles.input}
                />
                <select
                    name="role"
                    // value={formData.role}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" style={styles.button}>Sign Up</button>
            </form>
        </div>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px',
    },
    link: {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '20px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    }
};

export default Signup;
