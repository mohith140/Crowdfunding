const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    restaurantId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    address: {
        type: String,
        required: true,
        maxlength: 200
    },
    phone: {
        type: String,
        required: true
    },
    menu: Array
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;


