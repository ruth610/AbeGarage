const express = require('express');
const router = express.Router();
const addCustomerController = require('../controller/customer.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/api/customer',[authMiddleware.verifyToken, authMiddleware.isAdmin],addCustomerController.addCustomer);
router.put('/api/customer/:id',addCustomerController.updateCustomer);
router.get('/api/customer/:id', addCustomerController.getCustomerById);
router.get('/api/customers', [authMiddleware.verifyToken, authMiddleware.isAdmin], addCustomerController.getAllCustomers);
module.exports = router;
