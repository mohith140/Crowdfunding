const express = require('express')

const orderRouter = express.Router()

orderRouter.get('/', (req, res) => {

})

orderRouter.post('/:id/status', (req, res) => {

    const { id } = req.params.id;


})

module.exports = orderRouter