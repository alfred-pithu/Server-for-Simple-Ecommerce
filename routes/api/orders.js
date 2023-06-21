const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/ordersController')


// router.route('/')
//     .get(ordersController.getAllOrders)

router.route('/:itemId/order/:email')
    .post(ordersController.placeOrder)



module.exports = router;