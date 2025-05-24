const express = require('express');
const router = express.Router();

const addEmployeeController = require('../controller/employee.controller');

router.post('/api/employee' , addEmployeeController.createEmployee);

module.exports = router;