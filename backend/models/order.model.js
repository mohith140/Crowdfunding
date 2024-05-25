const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: Object, required: true },
    restaurantId: { type: String, required: true },
    items: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
