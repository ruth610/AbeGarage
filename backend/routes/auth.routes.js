const express = require('express');
const loginController = require('../controller/auth.controller');

const router = express.Router();

router.post('/api/employee/login',loginController.login);

module.exports = router;