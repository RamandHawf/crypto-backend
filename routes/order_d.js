const express = require('express');
const router = express.Router();
const orderController = require('.././app/controllers/OrderController');

// Create a new order
router.post('/create_order', orderController.createOrder);

// Get all orders
router.get('/getorder', orderController.getOrders);

// Get an order by ID
router.get('/getorderbyid/:id', orderController.getOrderById);

// Update an order
router.put('/update_order/:id', orderController.updateOrder);

// Delete an order
router.delete('/delete_order/:id', orderController.deleteOrder);
router.get('/getorderstats', orderController.getstatistics);



module.exports = router;
