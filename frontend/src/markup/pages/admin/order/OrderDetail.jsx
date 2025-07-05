import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../../../../services/order.service';
import serviceService from '../../../../services/service.service';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [serviceMap, setServiceMap] = useState({});
  const token = JSON.parse(localStorage.getItem('employee'))?.employee_token;

  useEffect(() => {
    if (!token) {
      console.error('No employee token found');
      return;
    }

    const fetchOrderAndServices = async () => {
      try {
        const res = await orderService.getOrderById(id, token);
        if (!res || res.length === 0) {
          console.error('Order not found');
          return;
        }

        setOrder(res[0]);

        const serviceDetailsMap = {};
        for (const service of res[0].order_services) {
          const detail = await serviceService.getServiceById(token, service.service_id);
          serviceDetailsMap[service.service_id] = detail;
        }

        setServiceMap(serviceDetailsMap);
      } catch (error) {
        console.error('Error fetching order or services:', error);
      }
    };

    fetchOrderAndServices();
  }, [id, token]);

  if (!order) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <h2 className="fw-bold mb-0">{order.customer_first_name} {order.customer_last_name}</h2>
          <hr style={{ border: '1px solid red', width: '40px', marginBottom: 0 }} />
        </div>
        <span className={`badge px-3 py-2 ${order.order_completed ? 'bg-success' : 'bg-warning text-dark'}`}>
          {order.order_completed ? "Completed" : "In progress"}
        </span>
      </div>

      {/* Customer and Vehicle Info */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 border-bottom border-danger pb-3">
          <h6 className="text-muted">Customer Info</h6>
          <p className="mb-1 fw-semibold">{order.customer_first_name} {order.customer_last_name}</p>
          <p className="mb-1">Email: {order.customer_email}</p>
          <p className="mb-0">Phone: {order.customer_phone_number}</p>
        </div>

        <div className="col-md-6 border-bottom border-danger pb-3">
          <h6 className="text-muted">Vehicle Info</h6>
          <p className="mb-1 fw-semibold">{order.vehicle_model} (Serial: {order.vehicle_serial})</p>
          <p className="mb-0">Year: {order.vehicle_year}</p>
        </div>
      </div>

      {/* Services */}
      <h5 className="mb-3">Requested Services</h5>
      <div className="border rounded p-4 bg-white shadow-sm">
        {order.order_services?.map((service) => {
          const detail = serviceMap[service.service_id] || {
            service_name: 'Unknown Service',
            service_description: 'No description available.'
          };

          return (
            <div key={service.order_service_id} className="d-flex justify-content-between align-items-start mb-4 pb-2 border-bottom">
              <div>
                <h6 className="mb-1">{detail.service_name}</h6>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  {detail.service_description}
                </p>
              </div>
              <span className={`badge px-3 py-2 ${service.service_completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                {service.service_completed ? 'Completed' : 'In progress'}
              </span>
            </div>
          );
        })}

        {/* Additional Request */}
        {order.additional_request && (
          <div className="d-flex justify-content-between align-items-start mb-2 pt-2">
            <div>
              <h6 className="mb-1">Additional Request</h6>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{order.additional_request}</p>
            </div>
            <span className="badge bg-warning text-dark px-3 py-2">In progress</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
