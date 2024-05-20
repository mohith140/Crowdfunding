require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const restaurantModel = require('./models/restaurant.model');


mongoose.connect("mongodb+srv://mohith1:mohith1@cluster0.knbt1jb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(console.log("Connected"))
    .catch(err => console.log(err));

app.use(express.json());

app.get('/api/admin/restaurants', (req, res) => {

})

app.listen(port, () => console.log(`Server running at ${port}`));    