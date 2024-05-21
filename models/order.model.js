const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: String,
    userId: String,
    restaurantId: String,
    totalPrice: Number,
    status: String,
    orderDate: Date
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;