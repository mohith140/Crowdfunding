const express = require('express')
const app = express()
app.use(express.json())

const restaurantManagementRouter = express.Router()

const restaurantModel = require('../../backend/models/restaurant.model');

restaurantManagementRouter.post('/', async (req, res) => {
    const { restaurantId, name, address, phone, menu } = req.body;
    const restaurant = await restaurantModel.create({ restaurantId, name, address, phone, menu })
    res.status(200).json(restaurant)
})

restaurantManagementRouter.put('/:id', async (req, res) => {
    const { name, address, phone, menu } = req.body;
    const restaurant = await restaurantModel.findOneAndUpdate({ restaurantId: req.params.id }, { name, address, phone, menu }, { new: true })
    res.status(200).json(restaurant)
})

restaurantManagementRouter.delete('/:id', async (req, res) => {
    await restaurantModel.findOneAndDelete({ restaurantId: req.params.id })
    res.json("Success")
})

module.exports = restaurantManagementRouter