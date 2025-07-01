const vehicleService = require('../service/vehicles.service');  

async function addVehicle(req, res) {
    try {
        const vehicleData = req.body;
        // check if the vehicle already exists
        const vehicleExists = await vehicleService.checkIfVehicleExists(vehicleData.vehicle_serial);
        if (vehicleExists) {
            console.log('Vehicle already exists');
            return res.status(400).json({ message: "Vehicle already exists!" });
        }
        if (!vehicleData.customer_id || !vehicleData.vehicle_make || !vehicleData.vehicle_model || !vehicleData.vehicle_year || !vehicleData.vehicle_type || !vehicleData.vehicle_mileage || !vehicleData.vehicle_serial || !vehicleData.vehicle_color || !vehicleData.vehicle_tag) {
            return res.status(400).send({ error: 'Missing required fields' });
        }
        // Here you would typically save the vehicle to the database
        const vehicle = await vehicleService.createVehicle(vehicleData);
        if (!vehicle) {
            return res.status(406).send({ error: 'Could not add vehicle' });
        }
        // For demonstration, we will just return a success message
        return res.status(201).send({ success: 'Vehicle added successfully' });
    } catch (error) {
        console.error('Error adding vehicle:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

async function updateVehicle(req, res) {
    try {
        const vehicleId = req.params.id;
        const vehicleData = req.body;

        const vehicle = await vehicleService.checkIfVehicleExists(vehicleId);
        if (!vehicle) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }
        const updatedVehicle = await vehicleService.updateVehicle(vehicleId, vehicleData);
        if (!updatedVehicle) {
            return res.status(406).send({ error: 'Could not update vehicle' });
        }
        // For demonstration, we will just return a success message
        return res.status(200).send({ success: 'Vehicle updated successfully' });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = {
    addVehicle,
    updateVehicle
};
