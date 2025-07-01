const Service = require('../service/service.service');

async function addService(req, res) {
    const { service_name, service_description } = req.body;

    // Validate request
    if (!service_name || !service_description) {
        console.error('Validation error: Missing required fields');
        return res.status(400).json({ error: 'All fields are required.' });
    }
        const data = {
            service_name: service_name,
            service_description: service_description
        };

    try {
        const newService = await Service.createService(data);
        if (!newService) {
            return res.status(406).json({ error: 'Could not add service.' });
        }
        
        return res.status(201).json(newService);
    } catch (error) {
        console.error('Error adding service:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function getAllServices(req, res) {
    try {
        const services = await Service.getAllServices();
        console.log(services);
        return res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

async function updateService(req, res) {
    const serviceId = req.params.id;
    const { service_name, service_description } = req.body;

    try {
        const service = await Service.updateService(serviceId, { service_name, service_description });
        if (!service) {
            return res.status(406).send({ error: 'Could not update service' });
        }

    return res.status(200).json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
async function deleteService(req, res) {
    const serviceId = req.body.service_id;

    try {
        const conn = await Service.db.getConnection();
        await conn.beginTransaction();

        const query = 'DELETE FROM common_services WHERE service_id = ?';
        const [result] = await conn.query(query, [serviceId]);

        if (result.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json({ error: 'Service not found.' });
        }

        await conn.commit();
        console.log('Service deleted successfully:', serviceId);
        return res.status(200).json({ message: 'Service deleted successfully.' });
    } catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {
    deleteService,
    updateService,
    addService,
    getAllServices
};