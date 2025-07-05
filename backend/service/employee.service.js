const {query,db} = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes');

async function checkIfEmployeeAlreadyExists(email){
    // console.log(`here is the probelm ${email}`)
    const query1 = 'SELECT * FROM employee WHERE employee_email = ?'
    const response = await query(query1, [email]);

    // console.log(response);
    if(response.length > 0){
        return true
    }
    else{
        return false
    }

}
async function getEmployeeByEmail(email){   
    const query1 = "SELECT * FROM employee JOIN employee_info  ON employee.employee_id = employee_info.employee_id JOIN employee_pass ON employee_pass.employee_id = employee.employee_id JOIN employee_role ON employee_role.employee_id = employee.employee_id WHERE employee.employee_email = ?;"
    const rows = await query(query1,[email]);
    console.log(rows);
    return rows
}

async function createEmployee(data){
    const conn = await db.getConnection();
    // console.log(data);
    const email = data.employee_email
    // console.log(email);
    const first_name = data.employee_first_name
    const last_name = data.employee_last_name
    const phone = data.employee_phone
    const active = data.active_employee
    const password = data.employee_password
    const employee_role = data.employee_role?data.employee_role:1
    let  createEmployee = {}
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        await conn.beginTransaction();

        const query1 = 'INSERT INTO employee(employee_email,active_employee) VALUES(?,?)';
        const response = await query(query1,[email,active]);
        console.log(response);
        if(response.affectedRows !== 1){
            return false
        }
        const employee_id =  response.insertId;

        const query2 = 'INSERT INTO employee_info(employee_first_name,employee_last_name,employee_phone,employee_id) VALUES(?,?,?,?)';
        const response2 = await query(query2,[first_name,last_name,phone,employee_id]);
        const query3 = 'INSERT INTO employee_pass(employee_id,employee_password_hashed) VALUES(?,?)';
        const reponse3 = await query(query3,[employee_id,hashedPassword]);
        const query4 = 'INSERT INTO employee_role(employee_id,company_role_id) VALUES(?,?)';
        const response4 = await query(query4,[employee_id,employee_role]);

        await conn.commit()
        createEmployee = {
            employee_id : employee_id
        }
        
    } catch (err) {
        await conn.rollback(); 
        console.error('Transaction failed:', err.message);
        return false;
    } finally {
        conn.release();
    }
    return createEmployee;

}

async function getActiveEmployees(){
    const query1 = 'SELECT * FROM employee JOIN employee_info ON employee.employee_id = employee_info.employee_id WHERE active_employee = 1';
    const rows = await query(query1);
    // console.log([rows]);
    if(rows.length > 0){
        return rows;
    }
    else{
        return false;
    }
}

module.exports = {checkIfEmployeeAlreadyExists,createEmployee,getEmployeeByEmail,getActiveEmployees};