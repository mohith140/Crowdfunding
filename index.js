require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const ordermanagement = require('./backend/routers/Adminrouters/ordermanagement.routers')
const restaurantManagementRouter = require('./backend/routers/Adminrouters/restaurantmanagement.routers')
const menuManagementRouter = require('./backend/routers/Adminrouters/menumanagement.routers')

const ordermanagementUserRouter = require('./backend/routers/Userrouters/ordermanagement.routers')
const restaurantmanagementUserRouter = require('./backend/routers/Userrouters/restaurantmanagement.routers')
const userauthentication = require('./backend/routers/Userrouters/userauthentication.routers')


mongoose.connect("mongodb+srv://mohith1:mohith1@cluster0.knbt1jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(console.log("Connected"))
    .catch(err => console.log(err));

app.use(express.json());

//User Endpoints
app.use('/api', userauthentication)
app.use('/api/orders', ordermanagementUserRouter)
app.use('/api/restaurants', restaurantmanagementUserRouter)


//Admin Endpoints
app.use('/api/admin/orders', ordermanagement);
app.use('/api/admin/restaurants', restaurantManagementRouter);
app.use('/api/admin/restaurants/:id/menu', menuManagementRouter);






app.listen(port, () => console.log(`Server running at ${port}`));    