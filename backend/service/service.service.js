const { db,query }= require("../config/dbConfig.js");

async function createService(data) {
    const conn = await db.getConnection();

    try {
        
        await conn.beginTransaction();
        const query1 = 'INSERT INTO common_services (service_name, service_description) VALUES (?, ?)';
        const [result1] = await conn.query(query1, [data.service_name, data.service_description]);
        // data.service_id = result1.insertId;
        await conn.commit();
        console.log('Service created successfully:', data);
        // Optionally, you can return the created service object

        return data;
    } catch (error) {
        console.error('Error creating service:', error);
        throw new Error('Service creation failed');
    }
}

async function getAllServices() {
    try {
        const conn = await db.getConnection();
        const query = 'SELECT * FROM common_services';
        const [rows] = await conn.query(query);
        conn.release();
        return rows;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw new Error('Failed to fetch services');
    }
}

async function updateService(serviceId, {service_name, service_description}) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const query = 'UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?';
        const [result] = await conn.query(query, [service_name, service_description, serviceId]);
        await conn.commit();
        if (result.affectedRows === 0) {
            throw new Error('Service not found');
        }
        console.log('Service updated successfully:', {service_name, service_description});
        return data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw new Error('Service update failed');
    } finally {
        conn.release();
    }
}

module.exports = {
    createService,
    getAllServices,
    updateService
};
