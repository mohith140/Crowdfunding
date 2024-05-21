import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/AdminDashboard';
import Order from './Components/Order';
import Restaurants from './Components/ReastaurantList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='orders/' element={<Order />} />
        <Route path='/restaurants' element={<Restaurants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
