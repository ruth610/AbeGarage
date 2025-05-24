const employeeLoginService = require('../service/auth.service');
const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
async function login(req,res,next){
    let sendBack = {}
    try {
        const employeeData = req.body
        const employee = await employeeLoginService.login(employeeData);
        if(employee.data == 'fail'){
            sendBack={
                status:employee.status,
                message:employee.message
            }
            return sendBack
        }
        else{
            // include a data that u want to use in ur front end
            const payload = {
            employee_id:employee.data.employee_id,
            employee_email:employee.data.employee_email,
            employee_first_name:employee.data.employee_first_name,
            employee_role:employee.data.company_role_id

            }
            const jwt_secret = process.env.JWT_SECRET
            const token = jwt.sign(payload,jwt_secret,{
                expiresIn: "24h",
            });
            sendBack = {
                employee_token:token
            }
            return res.status(statusCode.OK).json({
                message:'employee logged in successfully',
                data:sendBack
            });
        }
    
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message:'error occurred'});
    }

}



module.exports = {login}