const { db, query } = require("../config/dbConfig");
const bcrypt = require('bcrypt');
// const statusCode = require('http-status-codes');
async function createCustomer(data) {
    const conn = await db.getConnection();
    let createCustomer = {};
    const email = data.customer_email;
    const phone = data.customer_phone_number;
    const last_name = data.customer_last_name;
    const first_name = data.customer_first_name;
    const password = data.customer_hash;
    const status = data.active_customer_status;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        await conn.beginTransaction();

        const query1 = 'INSERT INTO customer_identifier(customer_hash,customer_email, customer_phone_number) VALUES(?,?,?)';
        const response1 = await query(query1, [hashedPassword, email, phone]);
        if (response1.affectedRows !== 1) {
            return false;
        }
        
        const customer_id = response1.insertId;

        const query2 = 'INSERT INTO customer_info(customer_id,customer_last_name, customer_first_name, active_customer_status) VALUES(?,?,?,?)';
        const response2 = await query(query2, [customer_id, last_name, first_name, status]);
        if (response2.affectedRows !== 1) {
            return false;
        }

        await conn.commit();
        createCustomer = {
            customer_id: customer_id,
            customer_email: email,
            customer_phone_number: phone,
            customer_last_name: last_name,
            customer_first_name: first_name,
            active_customer_status: status
        };
        return createCustomer;
    } catch (error) {
        console.error('Error creating customer:', error);
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }

}

async function getAllCustomers() {
    // from both customer_identifier and customer_info tables
    const query1 = "SELECT * FROM customer_identifier";
    const rows1 = await query(query1);
    if (rows1.length === 0) {
        return []; // No customers found
    }
    const query2 = "SELECT * FROM customer_info";
    const rows2 = await query(query2);
    if (rows2.length === 0) {
        return []; // No customer info found
    }
    const customers = [];
    for (let i = 0; i < rows1.length; i++) {
        const customer = {
            customer_id: rows1[i].customer_id,
            customer_email: rows1[i].customer_email,
            customer_phone_number: rows1[i].customer_phone_number,
            customer_last_name: rows2[i].customer_last_name,
            customer_first_name: rows2[i].customer_first_name,
            active_customer_status: rows2[i].active_customer_status,
            added_date:rows1[i].customer_added_date
        };
        customers.push(customer);
    }
    return customers;
}

async function getCustomerById(customerId) {
    // from both customer_identifier and customer_info tables
    const query1 = "SELECT * FROM customer_identifier WHERE customer_id = ?";
    const rows1 = await query(query1, [customerId]);
    if (rows1.length === 0) {
        return null; // Customer not found
    }
    const query2 = "SELECT * FROM customer_info WHERE customer_id = ?";
    const rows2 = await query(query2, [customerId]);
    if (rows2.length === 0) {
        return null; // Customer info not found
    }
    const customer = {
        customer_id: rows1[0].customer_id,
        customer_email: rows1[0].customer_email,
        customer_phone_number: rows1[0].customer_phone_number,
        customer_last_name: rows2[0].customer_last_name,
        customer_first_name: rows2[0].customer_first_name,
        active_customer_status: rows2[0].active_customer_status
    };
    return customer;
}

async function checkIfCustomerExists(customerId) {
    const query1 = "SELECT * FROM customer_identifier WHERE customer_id = ?";
    const rows = await query(query1, [customerId]);
    return rows.length > 0;
};

async function updateCustomer(customerId, data) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const query1 = 'UPDATE customer_identifier SET customer_email = ?, customer_phone_number = ? WHERE customer_id = ?';
        const response1 = await query(query1, [data.customer_email, data.customer_phone_number, customerId]);
        if (response1.affectedRows !== 1) {
            return false;
        }

        const query2 = 'UPDATE customer_info SET customer_last_name = ?, customer_first_name = ?, active_customer_status = ? WHERE customer_id = ?';
        const response2 = await query(query2, [data.customer_last_name, data.customer_first_name, data.active_customer_status, customerId]);
        if (response2.affectedRows !== 1) {
            return false;
        }

        await conn.commit();
        return true;
    } catch (error) {
        console.error('Error updating customer:', error);
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function checkIfCustomerAlreadyExists(email) {
    const query1 = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const rows = await query(query1, [email]);
    return rows.length > 0;
}
async function getCustomerByEmail(email) {
    const query1 = `
        SELECT ci.customer_email, ci.customer_hash, cinfo.customer_first_name, 
                cinfo.customer_last_name, cinfo.active_customer_status,
                cinfo.customer_id
        FROM customer_identifier ci
        JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
        WHERE ci.customer_email = ?
        `;

        const rows = await query(query1, [email]);

        if (rows.length === 0) {
        // Customer not found
        return null;
        }

        // rows[0] now contains customer_email, customer_hash, customer_first_name, last_name, active_status
        const customer = rows[0];
        console.log('hi')
        console.log(customer)
        return customer;
}


async function searchCustomers(query) {
  const conn = await db.getConnection();
  try {
    const search = `%${query}%`;
    const [results] = await conn.query(`
        SELECT customer_identifier.customer_id AS id,
                customer_identifier.customer_email,
                customer_identifier.customer_phone_number,
                customer_info.customer_first_name,
                customer_info.customer_last_name,
                customer_info.active_customer_status
        FROM customer_identifier
        INNER JOIN customer_info
            ON customer_identifier.customer_id = customer_info.customer_id
        WHERE customer_info.customer_first_name LIKE ?
            OR customer_info.customer_last_name LIKE ?
            OR customer_identifier.customer_email LIKE ?
            OR customer_identifier.customer_phone_number LIKE ?
        `, [search, search, search, search]);

    console.log(results);

    return results;
  } catch (err) {
    console.error('Customer search failed:', err);
    throw err;
  } finally {
    conn.release();
  }
}


module.exports = {
    createCustomer,
    checkIfCustomerAlreadyExists,
    checkIfCustomerExists,
    updateCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByEmail,
    searchCustomers
};