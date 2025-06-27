import React, { useState } from 'react'
import customerService from '../../../../services/customer.service';
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import SideBar from '../employee/SideBar';

const UpdateCustomer = () => {
    
    // console.log(employee);
    const [customer_email,setCustomerEmail] = useState('');
    const [customer_phone,setCustomerPhone] = useState('');
    const [active_customer,setActiveCustomer] = useState(1);
    const [customer_first_name,setCustomerFirstName] = useState('');
    const [customer_last_name, setCustomerLastName] = useState('');
    const [serverError , setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const customer_id = useParams();
    console.log(customer_id);


    const updateCustomer = async () => {

      try {
        const res = await customerService.updateCustomer(customer_id);
        const data = await res.json();

        if (!data) {
          setServerError('problem in updating customer info');
          setLoading(false);
        } else {
          setServerError('');
          setLoading(false);
        }
      } catch (err) {
        setServerError('Network or server error.');
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
                    <h2 className='mr-3 font-weight-bold mb-5'>Edit: a new customer</h2>
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
                        <select className="form-control" id="option" placeholder="customer active status" style={{width: '50%'}}>
                        <option value="">---Select---</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                        </select>
                    </div>
                    <button type="submit" className="theme-btn btn-style-one">{loading?<ClipLoader size={30} />:'UPDATE '}</button>
                    </form>
            </div>
    </div>

    </div>
  )
}

export default UpdateCustomer