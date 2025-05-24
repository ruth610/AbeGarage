const installService = require('../service/install.service');
const statusCode = require('http-status-codes').StatusCodes;
async function install(req, res) {
    try {
        // we will use the install service to handle the requests
        const result = await installService.install();
        return res.status(statusCode.OK).json({ message: 'Installation successful', result });
    } catch (error) {
        console.error('Error during installation:', error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Installation failed', error: error.message });
    }
}

// export the install function
module.exports = { install };

// when a consumer use this they should call its name like this const { install } = require('./controller/install.controller');