const employeeLoginService = require('../service/auth.service');
const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
async function loginEmployee(req,res,next){
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
            // console.log(token);
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

async function loginCustomer(req,res,next){
    let sendBack = {}
    try {
        const customerData = req.body
        const customer = await employeeLoginService.loginCustomer(customerData);
        if(customer.data == 'fail'){
            sendBack={
                status:customer.status,
                message:customer.message
            }
            return sendBack
        }
        else{
            // include a data that u want to use in ur front end
            console.log(customer);
            const payload = {
            customer_id:customer.data.customer_id,
            customer_email:customer.data.customer_email,
            customer_first_name:customer.data.customer_first_name,
            customer_last_name:customer.data.customer_last_name,
            customer_phone:customer.data.customer_phone_number,
            customer_active_status:customer.data.active_customer_status

            }
            const jwt_secret = process.env.JWT_SECRET
            const token = jwt.sign(payload,jwt_secret,{
                expiresIn: "24h",
            });
            console.log(token);
            sendBack = {
                customer_token:token
            }
            return res.status(statusCode.OK).json({
                message:'customer logged in successfully',
                data:sendBack
            });
        }
    
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({message:'error occurred'});
    }

}

module.exports = {loginEmployee, loginCustomer}