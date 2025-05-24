// from route we will use the controller to handle the requests
const installController = require('../controller/install.controller');
// we will use the express router to handle the requests
const express = require('express');
const router = express.Router();

router.get('/install', installController.install);


module.exports = router;
// this kind of object export is directly used in other files like this const installRoutes = require('./routes/install.routes');