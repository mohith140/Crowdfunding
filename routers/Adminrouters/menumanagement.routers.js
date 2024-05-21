const express = require('express')
const menuItemModel = require('../../models/menuItem.model')

const menuManagementRouter = express.Router()

menuManagementRouter.post('/', async (req, res) => {
    const { itemId, name, price, description, restaurantId } = req.body;
    const menuItem = await menuItemModel.create({ itemId, name, price, description, restaurantId })
    res.status(200).json(menuItem)
})

menuManagementRouter.put('/:itemId', async (req, res) => {
    const { name, price, description, restaurantId } = req.body;
    // console.log(req.params.id, req.params.itemId)
    const menuItem = await menuItemModel.findOneAndUpdate({ itemId: req.params.itemId }, { name, price, description, restaurantId }, { new: true })
    res.status(200).json(menuItem)
})

menuManagementRouter.delete('/:itemId', async (req, res) => {
    await menuItemId.findOneAndDelete({ itemId: req.params.id })
    res.json("Success")
})
module.exports = menuManagementRouter;