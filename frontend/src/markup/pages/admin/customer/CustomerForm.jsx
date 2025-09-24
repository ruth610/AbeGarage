import React, { useState } from 'react'
import customerService from '../../../../services/customer.service';
import styles from '../employee/style.module.css';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../context/AuthContext';

const AddCustomerForm = () => {
  const navigate = useNavigate();
  const [customer_email,setCustomerEmail] = useState('');
  const [customer_phone,setCustomerPhone] = useState('');
  const [active_customer,setActiveCustomer] = useState(1);
  const [customer_first_name,setCustomerFirstName] = useState('');
  const [customer_last_name, setCustomerLastName] = useState('');
  const [customer_password,setCustomerPassword] = useState('');
  const [loading , setLoading] = useState(false);

  // states for errors
  const [email_error, setEmailError] = useState('');
  const [first_name_error, setFirstNameError] = useState('');
  const [last_name_error , setLastNameError] = useState('');
  const [password_error, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // Create a variable to hold the user's token
    let loggedInEmployeeToken = '';
    // Destructure the auth hook and get the token
    const { employee } = useAuth();
    if (employee && employee.employee_token) {
      loggedInEmployeeToken = employee.employee_token;
    }

    console.log(loggedInEmployeeToken);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


  async function handleSubmit(e){
    e.preventDefault();

    let valid = true;
    if(!customer_email){
      setEmailError('email is required!');
      valid = false;
    }
    else{
      setEmailError('');
    }
    if(!customer_first_name){
      setFirstNameError('first name is required');
      valid = false;
    }
    else{
      setFirstNameError('');
    }
    if(!customer_last_name){
      setLastNameError('last name is required');
      valid = false;
    }
    else{
      setLastNameError('');
    }
    if(!customer_password || customer_password.length < 8){
      setPasswordError('password length must be more than 8 characters!!');
      valid = false;
    }
    else{
      setPasswordError('');
    }

    if(!valid){
      return;
    }

    const formData = {
      customer_email: customer_email,
      customer_first_name: customer_first_name,
      customer_last_name: customer_last_name,
      customer_phone_number: customer_phone,
      active_customer_status: active_customer,
      customer_hash: customer_password
  }

  const newCustomer = customerService.createCustomer(formData, loggedInEmployeeToken);
  newCustomer.then((res)=>res.json())
  .then((data)=>{
    if(data.error){
      setServerError(data.error);
      setLoading(true)
    }
    else{
      setSuccess(true);
      setServerError('');
      navigate('/admin');
      setLoading(false);
    }
  })
  }
  return (
    <>
        <div className="container mt-5 mb-5">
        {/* after this heading their is a red line horizontally aligned to it */}
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Add a new customer</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
        
        <form onSubmit={handleSubmit}>
          {serverError && <div className={styles.validation_error}>{serverError}</div>}
          <div className="form-group mb-4">
            <input type="email" className="form-control" value={customer_email} required onChange={event => setCustomerEmail(event.target.value)} id="email" placeholder="Customer email" style={{width: '50%'}}/>
          </div>
          {email_error && <div className={styles.validation_error}>{email_error}</div>}
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="fname" required value={customer_first_name} onChange={event => setCustomerFirstName(event.target.value)} placeholder="Customer First Name" style={{width: '50%'}} />
          </div>
          {first_name_error && <div className={styles.validation_error}>{first_name_error}</div>}
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="lname" required value={customer_last_name} onChange={event => setCustomerLastName(event.target.value)} placeholder="Customer Last Name" style={{width: '50%'}} />
          </div>
          {last_name_error && <div className={styles.validation_error}>{last_name_error}</div>}
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
          {success && <div className={styles.success_message}>Customer added successfully!</div>}
          
          <div className="form-group mb-4" style={{ position: 'relative', width: '50%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control pe-5"
            id="password"
            required
            value={customer_password}
            onChange={event => setCustomerPassword(event.target.value)}
            placeholder="Password"
          />
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} ${styles.password_toggle_icon}`}
            onClick={togglePassword}
            role="button"
            aria-label="Toggle password visibility"
          ></i>
        </div>

          {password_error && <div className={styles.validation_error}>{password_error}</div>}
          <button type="submit" className="theme-btn btn-style-one">{loading?<ClipLoader size={30} />:'ADD CUSTOMER'}</button>
        </form>
      </div>
    </>
  )
}

export default AddCustomerForm