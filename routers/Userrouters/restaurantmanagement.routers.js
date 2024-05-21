const express = require('express')
const restaurantModel = require('../../models/restaurant.model')
const menuItemModel = require('../../models/menuItem.model')

const router = express.Router()

router.get('/', async (req, res) => {
    const restaurants = await restaurantModel.find({})
    res.status(200).json(restaurants)
})
router.get('/:id/menu', async (req, res) => {
    const { id } = req.params
    const menuItems = await menuItemModel.find({ restaurantId: id })
    res.status(200).json(menuItems)
})

module.exports = router