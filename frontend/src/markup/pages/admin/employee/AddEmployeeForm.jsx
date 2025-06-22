import React, { useState } from 'react'
import employeeService from '../../../../services/auth.service';
import styles from './style.module.css';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router';

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [employee_email,setEmployeeEmail] = useState('');
  const [employee_phone,setEmployeePhone] = useState('');
  const [active_employee,setActiveEmployee] = useState(1);
  const [employee_first_name,setEmployeeFirstName] = useState('');
  const [employee_last_name, setEmployeeLastName] = useState('');
  const [employee_password,setEmployeePassword] = useState('');
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

    
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


  async function handleSubmit(e){
    e.preventDefault();

    let valid = true;
    if(!employee_email){
      setEmailError('email is required!');
      valid = false;
    }
    else{
      setEmailError('');
    }
    if(!employee_first_name){
      setFirstNameError('first name is required');
      valid = false;
    }
    else{
      setFirstNameError('');
    }
    if(!employee_last_name){
      setLastNameError('last name is required');
      valid = false;
    }
    else{
      setLastNameError('');
    }
    if(!employee_password || employee_password.length < 8){
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
      employee_email: employee_email,
      employee_first_name: employee_first_name,
      employee_last_name: employee_last_name,
      employee_phone: employee_phone,
      active_employee: active_employee,
      employee_password: employee_password
  }

  const newEmployee = employeeService.createEmployee(formData, loggedInEmployeeToken);
  newEmployee.then((res)=>res.json())
  .then((data)=>{
    if(data.error){
      setServerError(data.error);
      setLoading(false)
    }
    else{
      setSuccess(true);
      setServerError('');
      navigate('/');
      setLoading(true);
    }
  })
  }
  return (
    <>
        <div className="container mt-5 mb-5">
        {/* after this heading their is a red line horizontally aligned to it */}
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Add a new employee</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
        
        <form onSubmit={handleSubmit}>
          {serverError && <div className={styles.validation_error}>{serverError}</div>}
          <div className="form-group mb-4">
            <input type="email" className="form-control" value={employee_email} required onChange={event => setEmployeeEmail(event.target.value)} id="email" placeholder="Employee email" style={{width: '50%'}}/>
          </div>
          {email_error && <div className={styles.validation_error}>{email_error}</div>}
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="fname" required value={employee_first_name} onChange={event => setEmployeeFirstName(event.target.value)} placeholder="Employee First Name" style={{width: '50%'}} />
          </div>
          {first_name_error && <div className={styles.validation_error}>{first_name_error}</div>}
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="lname" required value={employee_last_name} onChange={event => setEmployeeLastName(event.target.value)} placeholder="Employee Last Name" style={{width: '50%'}} />
          </div>
          {last_name_error && <div className={styles.validation_error}>{last_name_error}</div>}
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="phone" required value={employee_phone} onChange={event => setEmployeePhone(event.target.value)} placeholder="Employee phone (555 555 555)" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <select className="form-control" id="option" placeholder="Employee type" style={{width: '50%'}}>
              <option value="">---Select---</option>
              <option value="full-time">Employee</option>
              <option value="part-time">Customer</option>
            </select>
          </div>
          <div className="form-group mb-4" style={{ position: 'relative', width: '50%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control pe-5"
            id="password"
            required
            value={employee_password}
            onChange={event => setEmployeePassword(event.target.value)}
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
          <button type="submit" className="theme-btn btn-style-one">{loading?<ClipLoader size={30} />:'ADD EMPLOYEE'}</button>
        </form>
      </div>
    </>
  )
}

export default AddEmployeeForm