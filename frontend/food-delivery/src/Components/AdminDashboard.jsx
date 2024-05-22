import React from 'react';
import userModel from '../models/user.model';

function AdminDashboard() {
    const id = localStorage.getItem('id')
    console.log(localStorage.getItem('token'))
    // const user = userModel.findOne({ _id: id })
    // console.log(user)
    // fetch('http://localhost:5000/api/user/' + id)
    //     .then(response => {
    //         console.log(response)
    //     })
    return <h1>{id}</h1>;
}

export default AdminDashboard;