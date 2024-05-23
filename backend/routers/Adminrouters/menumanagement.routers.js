const express = require('express')
const menuItemModel = require('../../models/menuItem.model')

const menuManagementRouter = express.Router()

menuManagementRouter.post('/:id/menu', async (req, res) => {
    const { itemId, name, price, description, restaurantId } = req.body;
    // console.log(req.body)
    const menuItem = await menuItemModel.create({ itemId, name, price, description, restaurantId })
    res.status(200).json(menuItem)
})

menuManagementRouter.put('/:id/menu/:itemId', async (req, res) => {
    const { name, price, description, restaurantId } = req.body;
    // console.log(req.params.id, req.params.itemId)
    const menuItem = await menuItemModel.findOneAndUpdate({ itemId: req.params.itemId }, { name, price, description, restaurantId }, { new: true })
    res.status(200).json(menuItem)
})

menuManagementRouter.delete('/:id/menu/:itemId', async (req, res) => {
    await menuItemModel.findOneAndDelete({ itemId: req.params.id })
    res.json("Success")
})

menuManagementRouter.get('/:id/menu', async (req, res) => {
    const data = await menuItemModel.find({ restaurantId: req.params.id })
    res.json(data)
})

module.exports = menuManagementRouter;