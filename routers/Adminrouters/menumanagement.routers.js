const express = require('express')
const menuItemModel = require('../models/menuItem.model')

const menuManagementRouter = express.Router()

menuManagementRouter.post('/:id/menu', (req, res) => {

})
menuManagementRouter.post('/:id/menu/:itemId', (req, res) => {

})
menuManagementRouter.delete('/:id/menu/:itemId', (req, res) => {

})
module.exports = menuManagementRouter;