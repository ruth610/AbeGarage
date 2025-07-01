const express = require('express');
const router = express.Router();

const orderController = require('../controller/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
// Route to create a new order
router.post('/api/order', [authMiddleware.verifyToken], orderController.createOrder);
router.get('/api/orders', [authMiddleware.verifyToken], orderController.getAllOrders);
router.get('/api/order/:id', [authMiddleware.verifyToken], orderController.getOrderById);
module.exports = router;