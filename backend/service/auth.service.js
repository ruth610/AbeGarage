const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes');
const employeeService = require('../service/employee.service');


async function login(employeeDataFromUser){
    let returnData = {}
    
    try {
        const employeeDataFromDatabase = await employeeService.getEmployeeByEmail(employeeDataFromUser.employee_email);
        console.log(employeeDataFromDatabase[0]);
        if(employeeDataFromDatabase.length[0] === 0){
            returnData= {
                status: "fail",
                message:"employee does not exist!"
            }
            return returnData;
        }
        const passwordMatched = await bcrypt.compare(employeeDataFromUser.employee_password,employeeDataFromDatabase[0].employee_password_hashed);
        if(!passwordMatched){
            returnData ={
                status:'fail',
                message:'incorrect password'
            }
            return returnData;
        }
        return returnData = {
            status:'success',
            data:employeeDataFromDatabase[0]
        }
    } catch (error) {
        console.log(error)
        returnData = {
            status: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message
        }
        return returnData
    }
    
}



module.exports = {login}