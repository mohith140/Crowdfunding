import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Login data:', formData);
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
                // await fetch('http://localhost:5000/api/dashboard')
                //     .then(respo => {
                //         console.log(respo);
                //         if (respo.status === 200) {
                //             navigate('/dashboard');
                //         }
                //         else {
                //             alert("Session expired");
                //         }
                //     })
                navigate('/dashboard');
            } else {
                alert(result);
            }
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
            <h2>Log In</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Log In</button>
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

export default Login;
