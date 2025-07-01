const express = require('express');
const installRoutes = require('./install.routes');
const addEmployeeRoute = require('./employee.routes');
const loginEmployeeRoute = require('./auth.routes');
const addCustomerRoute = require('./customer.routes');
const vehicleRoutes = require('./vehicles.routes');
const serviceRoutes = require('./service.routes'); // Uncomment if you have service routes


const router = express.Router();
// Define your routes here
router.use(installRoutes);
router.use(addEmployeeRoute);
router.use(loginEmployeeRoute);
router.use(addCustomerRoute);
router.use(vehicleRoutes);
router.use(serviceRoutes);
module.exports = router;