const customerService = require('../service/customer.service');
const bcrypt = require('bcrypt');
const statusCode = require('http-status-codes');
async function addCustomer(req, res) {
        try {
        const customerData = req.body;
        // console.log(req.body);
        if(!customerData.customer_first_name || !customerData.customer_last_name || !customerData.customer_email || !customerData.customer_phone_number || !customerData.customer_hash){ 
            return res.status(400).send({ error: 'Missing required fields' });
        }
        const customerExists = await customerService.checkIfCustomerAlreadyExists(req.body.customer_email);
        if(customerExists){
            console.log('customer already exists');
            return res.status(statusCode.BAD_REQUEST).json({message:"Customer already exists!!"});
        }
        if(customerData.customer_hash.length < 8){
            return res.status(400).send({ error: 'Password must be at least 8 characters long' });
        }
        const customer = await customerService.createCustomer(customerData);
        if(!customer){
            return res.status(406).send({error: 'Could not add customer'});
        }
        // Here you would typically save the customer to the database
        // For demonstration, we will just return a success message
        return res.status(201).send({ success: 'True'});
    } catch (error) {
        console.error('Error adding customer:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
    }
 async function getAllCustomers(req, res) {
    try {
        // Here you would typically fetch all customers from the database
        // For demonstration, we will just return a mock list of customers
        const customers = await customerService.getAllCustomers();
        if (!customers || customers.length === 0) {
            return res.status(404).send({ error: 'No customers found' });
        }
        return res.status(200).send(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        // Here you would typically fetch the customer by ID from the database
        // For demonstration, we will just return a mock customer
        const customer = await customerService.getCustomerById(customerId);
        if (!customer) {
            return res.status(404).send({ error: 'Customer not found' });
        }
        return res.status(200).send(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}


async function updateCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const customerData = req.body;

        const customer = await customerService.checkIfCustomerExists(customerId);
        if (!customer) {
            return res.status(404).send({ error: 'Customer not found' });
        }
        const cust = await customerService.updateCustomer(customerId, customerData);
        if (!cust) {    
            return res.status(406).send({ error: 'Could not update customer' });
        }
        // Here you would typically update the customer in the database
        // For demonstration, we will just return a success message
        return res.status(200).send({ success: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}
module.exports = {
    addCustomer,
    updateCustomer,
    getCustomerById,
    getAllCustomers
};