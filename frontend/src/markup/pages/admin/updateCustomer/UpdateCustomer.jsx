import React, { useEffect, useState } from 'react'
import customerService from '../../../../services/customer.service';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import SideBar from '../employee/SideBar';
import { useAuth } from '../../../../context/AuthContext';

const UpdateCustomer = () => {
    
    // console.log(employee);
    const [customer ,setCustomer] = useState({});
    const [customer_email,setCustomerEmail] = useState('');
    const [customer_phone,setCustomerPhone] = useState('');
    const [active_customer,setActiveCustomer] = useState(1);
    const [customer_first_name,setCustomerFirstName] = useState('');
    const [customer_last_name, setCustomerLastName] = useState('');
    const [serverError , setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const customer_id = useParams();
    console.log(customer_id.customer_id);
    const {employee,isAdmin} = useAuth();

    const fetchCustomer = async () => {

      try {
        const res = await customerService.getCustomerById(customer_id.customer_id);
        const data = await res.json();

        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
            console.log(data);
          setCustomer(data);
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
    },[customer_id]);


        const handleToggleStatus = async (currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1; // Toggle between 1 and 0

        try {
            // Update status locally
            setActiveCustomer(newStatus);

        } catch (error) {
            alert("Failed to update customer status.");
            console.error(error);
        }
        };
       

    const updateCustomer = async (e) => {
        e.preventDefault(); // Prevent form refresh
        setLoading(true);

        const formData = {
            customer_email,
            customer_first_name,
            customer_last_name,
            customer_phone_number: customer_phone,
            active_customer_status: active_customer
        };

        try {
            const res = await customerService.updateCustomer(customer_id.customer_id, formData);
            const data = await res.json();

            if (data.error) {
            setServerError(data.error);
            } else {
            setServerError('');
            alert('Customer updated successfully!');
            await fetchCustomer();
            }
        } catch (err) {
            setServerError('Network or server error.');
        } finally {
            setLoading(false);
        }
        };

  return (
    <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-5 customer_table">
                <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
                    <h2 className='mr-3 font-weight-bold mb-5'>Edit: {customer.customer_first_name} {customer.customer_last_name}</h2>
                    <hr style={{ border: '1px solid red', width: '5%' }} />
                </div>  
                <form onSubmit={updateCustomer}>
                    {serverError && <div className={styles.validation_error}>{serverError}</div>}
                    <div className="form-group mb-4">
                        <input type="email" className="form-control" value={customer_email} required onChange={event => setCustomerEmail(event.target.value)} id="email" placeholder="Customer email" style={{width: '50%'}}/>
                    </div>
                    <div className="form-group mb-4">
                        <input type="text" className="form-control" id="fname" required value={customer_first_name} onChange={event => setCustomerFirstName(event.target.value)} placeholder="Customer First Name" style={{width: '50%'}} />
                    </div>
                    <div className="form-group mb-4">
                        <input type="text" className="form-control" id="lname" required value={customer_last_name} onChange={event => setCustomerLastName(event.target.value)} placeholder="Customer Last Name" style={{width: '50%'}} />
                    </div>
                    <div className="form-group mb-4">
                        <input type="text" className="form-control" id="phone" required value={customer_phone} onChange={event => setCustomerPhone(event.target.value)} placeholder="Customer phone (555 555 555)" style={{width: '50%'}} />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="checkbox"
                            checked={!!active_customer}
                            disabled={!employee || !isAdmin}
                            onChange={()=>handleToggleStatus(active_customer)}
                            
                        />
                    </div>
                    <button type="submit" className="theme-btn btn-style-one">{loading?<ClipLoader size={30} />:'UPDATE '}</button>
                    </form>
            </div>
    </div>

    </div>
  )
}

export default UpdateCustomer