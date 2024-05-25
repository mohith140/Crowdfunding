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
    const { orderId, userId, restaurantId, items, totalPrice, orderDate } = req.body;

    try {
        const newOrder = await orderModel.create({
            orderId,
            userId,
            restaurantId,
            items,
            totalPrice,
            status: 'pending',  // Default value defined in the schema
            orderDate  // This will be taken from req.body or default to Date.now if not provided
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

router.put('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await orderModel.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

module.exports = router;