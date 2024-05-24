const express = require('express');
const orderModel = require('../../models/order.model');

const orderRouter = express.Router();

// GET endpoint to fetch all orders
orderRouter.get('/', async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// POST endpoint to update the status of an order
orderRouter.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const orderStatuse = await orderModel.findOneAndUpdate(
            { orderId: id },
            { status: status },
            { new: true }
        );

        if (!orderStatuse) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(orderStatuse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
});

orderRouter.delete('/:id', async (req, res) => {

    const { id } = req.params;
    const updtaedOrders = await orderModel.findOneAndDelete({ orderId: id });
    res.json("Success")

})

module.exports = orderRouter;