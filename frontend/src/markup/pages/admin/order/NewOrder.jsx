import React from "react";
import SideBar from "../employee/SideBar";
import { useState } from "react";
import { useEffect } from "react";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router";
import CustomerInfo from "../customerProfile/CustomerInfo";
import service from '../../../../services/service.service';
import employeeService from "../../../../services/employee.service";


const NewOrder = () => {
  const [search, setSearch] = useState('');
  const [additionalRequest, setAdditionalRequest] = useState({
    description: '',
    price: ''
  });
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || '';
  const [selectedServices, setSelectedServices] = useState([]);



  const fetchCustomers = async (value) => {
    try {
      setLoading(true);
      // console.log(search)
      const res = await orderService.searchCustomers(value,loggedInEmployeeToken);
      console.log(res);
      if (Array.isArray(res)) {
        setCustomers(res);
        // console.log(customers)
      } else {
        setCustomers([]); 
      }
      setLoading(false);
    } catch (err) {
      console.error('Search error:', err);
      setLoading(false);
    }
  };
  const fetchActiveEmployees = async () => {
    setLoading(true);
    try {
      const res = await employeeService.getActiveEmployees(loggedInEmployeeToken);
      console.log(res);
      if (Array.isArray(res)) { 
        setActiveEmployees(res);
        setLoading(false);
      } else {
        setActiveEmployees([]); // fallback
      }
    } catch (err) {
      console.error('Error fetching active employees:', err);
      setLoading(false);
    }
  };

  const toggleInfo = async (customer) => {
      setSelectedCustomer(customer); // Set the chosen customer
      fetchActiveEmployees(); // Fetch active employees when a customer is selected

      try {
        console.log(customer.id);
        const res = await orderService.getVehiclesByCustomer(customer.id, loggedInEmployeeToken);
        console.log(res);
        if (Array.isArray(res)) {
          setVehicles(res);
        // console.log(customers)
      } 
       else if (res && typeof res === 'object') {
        setVehicles([res]); // 👈 wrap single object into an array
      } else {
        setVehicles([]); // fallback
      }
        
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchCustomers(value);
  };

     useEffect(() => {
      const fetchServices = async () => {
        try {
          const res = await service.getAllServices(loggedInEmployeeToken);
          const data = await res.json();
          setServices(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
          console.error('Failed to load services:', err);
        }
        };

        if (selectedVehicle) {
          fetchServices(); // only fetch when a vehicle is selected
        }
      }, [selectedVehicle, loggedInEmployeeToken]);


  const handleServiceSelect = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId) // remove if already selected
        : [...prev, serviceId] // add if not selected
    );
  };

  async function handleAddServiceRequest(){
    const formData = {
      additional_request:additionalRequest.description,
      order_total_price:additionalRequest.price,
      vehicle_id:selectedVehicle.vehicle_id,
      employee_id:selectedEmployee.employee_id,
      customer_id:selectedCustomer.id,
      services: selectedServices.map(serviceId => ({ service_id: serviceId })),
    }
    try {
      if( !selectedCustomer || !selectedEmployee || !selectedVehicle || selectedServices.length === 0) {
        // console.log(selectedEmployee.employee_id)
        console.error('Please select a customer, employee, vehicle, and at least one service.');
        return;
      }
      const res = await orderService.addOrder(formData, loggedInEmployeeToken);
      console.log(res);
      if (res ) {
        // Handle successful service addition
        alert('order added successfully!');
        setSelectedCustomer(null);
        setSelectedEmployee(null);
        setSelectedVehicle(null);
        setSelectedServices([]);
        setAdditionalRequest({ description: '', price: '' });
      } else {
        // Handle failure
        console.error('Failed to add order');
      }
    } catch (err) {
      console.error('Error adding services:', err);
    }
  }
      console.log(selectedServices);
      console.log(activeEmployees)
  return (
    <>
     <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
              <div className='col-md-3 admin-left-side'>
                  <SideBar /> 
              </div>
              <div className="col-md-9 p-5">
                  <div className='d-flex align-items-baseline mb-3 mt-3'>
                    <h4 className='mr-1 font-weight-semibold'>Create a New Order</h4>
                    <hr style={{ border: '1px solid red', width: '5%' }} />
                  </div>
                  {
                    selectedCustomer ? (
                      <div className="p-2">
                        <CustomerInfo customer_email={selectedCustomer?.customer_email} customer_phone={selectedCustomer?.customer_phone_number} active_customer={selectedCustomer?.active_customer_status} customer_id={selectedCustomer?.customer_id} customer_first_name={selectedCustomer?.customer_first_name} customer_last_name={selectedCustomer?.customer_last_name} onBack={() => setSelectedCustomer(null)}/>
                          {selectedEmployee? <h5>Selected Employee:{selectedEmployee?.employee_first_name}</h5>:(
                            <div>
                            <div className='card p-3'>
                              <h4>Choose Employee</h4>

                              
                            {loading ? (
                              
                                <p>Loading...</p>
                              ) : customers.length === 0 ? (
                                <p>No active employee found</p>
                              ) : (
                                <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                      <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Select</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {activeEmployees && activeEmployees.length > 0 ? (
                                        activeEmployees.map((employee) => (
                                          <tr key={employee.employee_id}>
                                            <td>{employee.employee_first_name}</td>
                                            <td>{employee.employee_last_name}</td>
                                            <td>{employee.employee_email}</td>
                                            <td>{employee.employee_phone_number}</td>
                                            <td>
                                              <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => setSelectedEmployee(employee)}
                                                title="Select employee"
                                              >
                                                <i className="bi bi-hand-index-thumb"></i> {/* Or use FontAwesome/Lucide icon */}
                                              </button>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan="5" className="text-center">No employee found</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>

                              )}
                            <button type='submit' className='btn btn-danger' onClick={() => navigate('/admin/add-employee')}>Add a New Employee</button>
                        
                          </div>
                          </div>
                          )}
                         
                          
                          {selectedVehicle ? (
                            <div>
                            <div>
                              <div className="card mt-3 p-3 border-danger">
                                <h5 className="text-black mb-3">Selected Vehicle Details</h5>
                                <div className="row">
                                  <div className="col-md-4"><strong>Year:</strong> {selectedVehicle.vehicle_year}</div>
                                  <div className="col-md-4"><strong>Make:</strong> {selectedVehicle.vehicle_make}</div>
                                  <div className="col-md-4"><strong>Model:</strong> {selectedVehicle.vehicle_model}</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4"><strong>Tag:</strong> {selectedVehicle.vehicle_tag}</div>
                                  <div className="col-md-4"><strong>Serial:</strong> {selectedVehicle.vehicle_serial}</div>
                                  <div className="col-md-4"><strong>Color:</strong> {selectedVehicle.vehicle_color}</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4"><strong>Mileage:</strong> {selectedVehicle.vehicle_mileage}</div>
                                  <div className="col-md-8 text-end">
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => setSelectedVehicle(null)}>
                                      Deselect Vehicle
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white mt-3">
                                {services && services.map(service => (
                                  <div key={service.service_id} className="d-flex justify-content-between align-items-center border p-3 m-2 rounded">

                                    {/* Service Info */}
                                    <div className="flex-grow-1">
                                      <strong>{service.service_name}</strong>
                                      <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                                        {service.service_description}
                                      </p>
                                    </div>

                                    {/* Checkbox */}
                                    <div style={{ width: '50px' }} className="text-end ms-3">
                                      <input
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={selectedServices.includes(service.service_id)}
                                          onChange={() => handleServiceSelect(service.service_id)}
                                        />

                                    </div>

                                  </div>
                                ))}
                              </div>
                              <div className="card mt-4 p-3 border-info">
                                <h5 className="mb-3 text-info">Additional Service Request</h5>

                                <div className="form-group mb-3">
                                  <label htmlFor="additionalDescription" className="form-label">Service Description</label>
                                  <textarea
                                    id="additionalDescription"
                                    className="form-control"
                                    placeholder="Enter additional service description"
                                    rows={3}
                                    value={additionalRequest.description}
                                    onChange={(e) =>
                                      setAdditionalRequest({ ...additionalRequest, description: e.target.value })
                                    }
                                  ></textarea>
                                </div>

                                <div className="form-group mb-3">
                                  <label htmlFor="additionalPrice" className="form-label">Estimated Price</label>
                                  <input
                                    type="number"
                                    id="additionalPrice"
                                    className="form-control"
                                    placeholder="Enter price"
                                    value={additionalRequest.price}
                                    onChange={(e) =>
                                      setAdditionalRequest({ ...additionalRequest, price: e.target.value })
                                    }
                                  />
                                  <button className="btn btn-outline-secondary btn-sm" onClick={handleAddServiceRequest}>
                                    SUBMIT Order {/* Or use FontAwesome/Lucide icon */}
                                  </button>
                                </div>
                              </div>
                              </div>
                              </div>
                            ):
                            <div className="card p-3 mt-4">
                              <h5 className="mb-3">Choose a vehicle</h5>
                              {vehicles.length === 0 ? (
                                <p>No vehicles found for this customer.</p>
                              ) : (
                                <table className="table table-bordered">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Year</th>
                                      <th>Make</th>
                                      <th>Model</th>
                                      <th>Tag</th>
                                      <th>Serial</th>
                                      <th>Color</th>
                                      <th>Mileage</th>
                                      <th>Choose</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {vehicles && vehicles.length > 0 ? (vehicles.map(vehicle => (
                                      <tr key={vehicle.vehicle_id}>
                                        <td>{vehicle.vehicle_year}</td>
                                        <td>{vehicle.vehicle_make}</td>
                                        <td>{vehicle.vehicle_model}</td>
                                        <td>{vehicle.vehicle_tag}</td>
                                        <td>{vehicle.vehicle_serial}</td>
                                        <td>{vehicle.vehicle_color}</td>
                                        <td>{vehicle.vehicle_mileage}</td>
                                        <td>
                                          <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() => setSelectedVehicle(vehicle)}
                                          >
                                            <i className="bi bi-hand-index-thumb"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))) : (
                                      <tr>
                                        <td colSpan="8" className="text-center">No vehicles found</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              )}
                            </div>}

                          

                      </div>
                    ) : (
                      <div className='card p-3'>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className='form-group'>
                            <input type='search' className='form-control' id='customerName' value={search} onChange={handleSearchChange} placeholder='Search for customer using name email, phone number' />
                      </div>
                      {loading ? (
                        
                          <p>Loading...</p>
                        ) : customers.length === 0 ? (
                          <p>No customers found</p>
                        ) : (
                          <table className="table table-striped table-bordered">
                              <thead className="thead-dark">
                                <tr>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Select</th>
                                </tr>
                              </thead>
                              <tbody>
                                {customers && customers.length > 0 ? (
                                  customers.map((customer) => (
                                    <tr key={customer.customer_id}>
                                      <td>{customer.customer_first_name}</td>
                                      <td>{customer.customer_last_name}</td>
                                      <td>{customer.customer_email}</td>
                                      <td>{customer.customer_phone_number}</td>
                                      <td>
                                        <button
                                          className="btn btn-outline-secondary btn-sm"
                                          onClick={() => toggleInfo(customer)}
                                          title="Select customer"
                                        >
                                          <i className="bi bi-hand-index-thumb"></i> {/* Or use FontAwesome/Lucide icon */}
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5" className="text-center">No customers found</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>

                        )}
                      <button type='submit' className='btn btn-danger' onClick={() => navigate('/admin/add-customer')}>Add a New Customer</button>
                    </form>
                    </div>
                    )
                    }

              </div>
        </div>
    </div>
    </>
  );
}

export default NewOrder; 