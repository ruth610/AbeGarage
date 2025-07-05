const employeeService = require('../service/employee.service');
const statusCode = require('http-status-codes');
async function createEmployee(req,res,next){
    const employeeExists = await employeeService.checkIfEmployeeAlreadyExists(req.body.employee_email);
    if(employeeExists){
        console.log('employee already exists');
        return res.status(statusCode.BAD_REQUEST).json({message:"Employee already exists!!"});
    }
    else{
        try {
            const employeeData = req.body;
            // console.log(req.body);
            const employee = await employeeService.createEmployee(employeeData);
            // console.log(employee)
            if(!employee){
                return res.status(statusCode.NOT_ACCEPTABLE).json({message:"couldn't add an employee"});
            }
            else{
                return res.status(statusCode.CREATED).json({"success":"true"})
            }
        } catch (error) {
            console.log(error)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({error:error.message})
        }
    }


}

async function getActiveEmployees(req, res) {
    try {
        const employees = await employeeService.getActiveEmployees();
        if (!employees || employees.length === 0) {
            console.log(employees);
            return res.status(statusCode.NOT_FOUND).json({ error: 'No active employees found' });
        }
        console.log(employees);
        return res.status(statusCode.OK).json(employees);
    } catch (error) {
        console.error('Error fetching active employees:', error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}
module.exports = {createEmployee, getActiveEmployees}