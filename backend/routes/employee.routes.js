const express = require('express');
const router = express.Router();

const addEmployeeController = require('../controller/employee.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/api/employee' ,[authMiddleware.verifyToken ,authMiddleware.isAdmin ],addEmployeeController.createEmployee);
router.get('/api/employee/active', addEmployeeController.getActiveEmployees); 
module.exports = router;

