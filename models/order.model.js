const mongoose = require('mongoose');

const orderSchema = mongoose.model({
    orderId: String,
    userId: String,
    restaurantId: String,
    totalPrice: Number,
    status: String,
    orderDate: Date
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;