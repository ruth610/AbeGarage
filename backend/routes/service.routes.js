const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route to add a new service
router.post('/api/service',[authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.addService);
router.get('/api/services', [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.getAllServices);
router.get('/api/service/:id',  serviceController.getServiceById);
router.delete('/api/service/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.deleteService);
module.exports = router;

