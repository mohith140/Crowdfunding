const express = require('express');
const orderModel = require('../../models/order.model');

const router = express.Router();

// GET endpoint to fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// POST endpoint to create a new order
router.post('/', async (req, res) => {
    const { orderId, userId, restaurantId, items, totalPrice } = req.body;

    try {
        const newOrder = await orderModel.create({
            orderId,
            userId,
            restaurantId,
            items,
            totalPrice,
            status: "pending",
            date: new Date() // Ensure the date field is properly set
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

module.exports = router;