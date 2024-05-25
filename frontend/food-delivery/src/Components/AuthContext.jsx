import React, { useEffect } from 'react'
import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [])

    const loginAction = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            // console.log(responseData)
            if (responseData) {
                setToken(responseData.token);
                setRole(responseData.user.role);
                setUser(responseData.user)
                console.log(responseData.user)
                localStorage.setItem('token', responseData.token)
                localStorage.setItem('role', responseData.user.role)
                return responseData.user
            }
            throw new Error(response.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, role, loginAction }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
};