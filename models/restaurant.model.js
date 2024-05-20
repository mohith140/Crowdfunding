const mongoose = require('mongoose');

const restaurantSchema = mongoose.model({
    restaurantId: String,
    name: String,
    address: String,
    phone: String,
    menu: String
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;