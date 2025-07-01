import { Link, useParams } from 'react-router-dom';
import customerService from '../../../../services/customer.service';
import { useState } from 'react';
import { useEffect } from 'react';
import AddVehicles from '../vehicles/addVehicles';

const CustomerProfile = () => {
    const [customer_email,setCustomerEmail] = useState('');
    const [customer_phone,setCustomerPhone] = useState('');
    const [active_customer,setActiveCustomer] = useState(1);
    const [customer_first_name,setCustomerFirstName] = useState('');
    const [customer_last_name, setCustomerLastName] = useState('');
    const [serverError , setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAddVehicle, setShowAddVehicle] = useState(false);

    const customer_id = useParams();
    // console.log(customer_id);
    const fetchCustomer = async () => {

      try {
        const res = await customerService.getCustomerById(customer_id.customer_id);
        const data = await res.json();

        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
            console.log(data);
            setCustomerEmail(data.customer_email);
            setCustomerFirstName(data.customer_first_name);
            setCustomerLastName(data.customer_last_name);
            setActiveCustomer(data.active_customer_status);
            setCustomerPhone(data.customer_phone_number);
            setServerError('');
            setLoading(false);
        }
      } catch (err) {
        setServerError('Network or server error.');
        setLoading(false);
      }
    };
    useEffect(()=>{
        fetchCustomer();
    },[]);

  return (
    <div className="container mt-5">
      <div className="row position-relative">
        {/* Sidebar with vertical line and circles */}
        <div className="col-md-2 d-flex flex-column align-items-center">
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '80px',
              top: '100px',
              bottom: '50px',
              width: '4px',
              background: 'linear-gradient(180deg, pink, pink)',
              zIndex: 0
            }}
          ></div>

          {/* Circles */}
          <div style={{ zIndex: 1, marginTop: '30px', gap:'85px' }} className="my-4 d-flex flex-column align-items-center">
            <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mb-5" style={{ width: '80px', height: '80px', fontWeight: 'bold' }}>
              Info
            </div>
            <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mb-5" style={{ width: '80px', height: '80px', fontWeight: 'bold' }}>
              Cars
            </div>
            <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mt-5" style={{ width: '80px', height: '80px', fontWeight: 'bold' }}>
              Orders
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          {/* Info Section */}
          <h4 className="mb-4 mt-1">Customer: <strong>{customer_first_name} {customer_last_name}</strong></h4>
          <p><strong>Email:</strong> {customer_email}</p>
          <p><strong>Phone Number:</strong> {customer_phone}</p>
          <p><strong>Active Customer:</strong> {active_customer === 1 ? "YES" : "NO"}</p>
          <p>
            <strong>Edit customer info: </strong>
            <Link to={`/admin/customer/${customer_id.customer_id}`} className="text-danger">
              <i className="bi bi-pencil-square"></i>
            </Link>
          </p>

          <hr />

          {/* Cars Section */}
          <h5 className="mt-5">Vehicles of {customer_first_name}</h5>
          <div className="bg-white p-3 shadow-sm mb-3" style={{ borderRadius: '5px' }}>
            No vehicle found
          </div>
          <button className="btn btn-danger" onClick={() => setShowAddVehicle(true)}>ADD NEW VEHICLE</button>
          {showAddVehicle && (
            <AddVehicles
              onDone={() => setShowAddVehicle(false)} // optionally hide the form after adding
            />
          )}

          <hr className="mt-5" />

          {/* Orders Section */}
          <h5 className='mt-5'>Orders of {customer_first_name}</h5>
          <p>Orders will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
