async function createVehicle(data) {
    const conn = await db.getConnection();
    let createVehicle = {};
    const customer_id = data.customer_id;
    const make = data.vehicle_make;
    const model = data.vehicle_model;
    const year = data.vehicle_year;
    const type = data.vehicle_type;
    const mileage = data.vehicle_mileage;
    const serial = data.vehicle_serial;
    const color = data.vehicle_color;
    const tag = data.vehicle_tag;

    try {
        await conn.beginTransaction();

        const query1 = 'INSERT INTO vehicle (customer_id, vehicle_make, vehicle_model, vehicle_year, vehicle_type, vehicle_mileage, vehicle_serial, vehicle_color, vehicle_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const response1 = await query(query1, [customer_id, make, model, year, type, mileage, serial, color, tag]);
        if (response1.affectedRows !== 1) {
            return false;
        }

        const vehicle_id = response1.insertId;

        createVehicle = {
            vehicle_id: vehicle_id,
            customer_id: customer_id,
            vehicle_make: make,
            vehicle_model: model,
            vehicle_year: year,
            vehicle_type: type,
            vehicle_mileage: mileage,
            vehicle_serial: serial,
            vehicle_color: color,
            vehicle_tag: tag
        };
        return createVehicle;
    } catch (error) {
        console.error('Error creating vehicle:', error);
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function checkIfVehicleExists(vehicleId) {
    const query1 = "SELECT * FROM vehicle WHERE vehicle_id = ?";
    const rows = await query(query1, [vehicleId]);
    return rows.length > 0;
}

async function updateVehicle(vehicleId, data) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const query1 = 'UPDATE vehicle SET customer_id = ?, vehicle_make = ?, vehicle_model = ?, vehicle_year = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_serial = ?, vehicle_color = ?, vehicle_tag = ? WHERE vehicle_id = ?';
        const response1 = await query(query1, [data.customer_id, data.vehicle_make, data.vehicle_model, data.vehicle_year, data.vehicle_type, data.vehicle_mileage, data.vehicle_serial, data.vehicle_color, data.vehicle_tag, vehicleId]);
        if (response1.affectedRows !== 1) {
            return false;
        }

        await conn.commit();
        return true;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function checkIfVehicleAlreadyExists(serial) {
    const query1 = "SELECT * FROM vehicle WHERE vehicle_serial = ?";
    const rows = await query(query1, [serial]);
    return rows.length > 0;
}

module.exports = {
    createVehicle,
    checkIfVehicleAlreadyExists,
    checkIfVehicleExists,
    updateVehicle
};