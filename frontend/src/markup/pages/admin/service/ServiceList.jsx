import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import service from '../../../../services/service.service';
import { useAuth } from '../../../../context/AuthContext';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || '';

  // ✅ Load services function (used on mount + after add)
  const loadServices = () => {
    service.getAllServices(loggedInEmployeeToken)
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : data.data || []);  // ✅ Safe fallback
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load services:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadServices(); // fetch on mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      service_name: serviceName,
      service_description: serviceDescription
    };

    service.addService(formData, loggedInEmployeeToken)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
          alert('Service added successfully');
          setServiceName('');
          setServiceDescription('');
          setServerError('');
          // ✅ Refresh the service list
          loadServices();
        }
      });
  };

  const handleEdit = (serviceId) => {
    console.log('Edit service', serviceId);
  };

  const handleDelete = (serviceId) => {
    console.log('Delete service', serviceId);
  };

  return (
    <div className="container mt-4">
      <div className='d-flex align-items-baseline'>
        <h4 className='mr-1 font-weight-semibold'>Service Provider</h4>
        <hr style={{ border: '1px solid red', width: '5%' }} />
      </div>
      <p className='pl-4 text-muted'>
        Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.
      </p>

      <div className="bg-white pl-4 shadow-sm rounded">
        {services && services.map(service => (
          <div key={service.service_id} className="d-flex justify-content-between align-items-start border-bottom py-3 mb-3">

            <div>
              <strong>{service.service_name}</strong>
              <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{service.service_description}</p>
            </div>
            <div>
              <button className="btn btn-sm btn-light mr-2" onClick={() => handleEdit(service.service_id)}>
                <FaEdit color="#dc3545" />
              </button>
              <button className="btn btn-sm btn-light" onClick={() => handleDelete(service.service_id)}>
                <FaTrash color="#dc3545" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Service Section */}
      <div className="mt-5 bg-white p-2 ">
        <div className='d-flex align-items-baseline'>
          <h4 className='mr-1 font-weight-semibold'>Add a new Service</h4>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>

        <form className="mt-3" onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-4" placeholder="Service name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
          <textarea className="form-control mb-4" placeholder="Service description" rows={3} value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} required />
          <button className="btn btn-danger" disabled={loading}>Add Service</button>
        </form>
      </div>
    </div>
  );
};

export default ServiceList;
