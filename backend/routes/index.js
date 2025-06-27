const express = require('express');
const installRoutes = require('./install.routes');
const addEmployeeRoute = require('./employee.routes');
const loginEmployeeRoute = require('./auth.routes');
const addCustomerRoute = require('./customer.routes');


const router = express.Router();
// Define your routes here
router.use(installRoutes);
router.use(addEmployeeRoute);
router.use(loginEmployeeRoute);
router.use(addCustomerRoute);
module.exports = router;