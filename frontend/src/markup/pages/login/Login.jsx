import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import employeeService from '../../../services/auth.service';
import { useAuth } from '../../../context/AuthContext';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState('');
  const [employee_password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUserTypeSelected, setIsUserTypeSelected] = useState(false);
  const [userType, setUserType] = useState(''); // 'employee' or 'customer'

  const {setIsLogged,setEmployee} = useAuth();
const handleSubmit = async (event) => {
  event.preventDefault();

  // Client-side validation
  let valid = true;

  if (!employee_email) {
    setEmailError('Please enter your email address first');
    valid = false;
  } else if (!employee_email.includes('@')) {
    setEmailError('Invalid email format');
    valid = false;
  } else {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(employee_email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
  }

  if (!employee_password || employee_password.length < 6) {
    setPasswordError('Password must be at least 6 characters long');
    valid = false;
  } else {
    setPasswordError('');
  }

  if (!valid) return;

  // Prepare login data depending on user type
  let formData = {};
  if (userType === 'employee') {
    formData = {
      employee_email,
      employee_password
    };
  } else if (userType === 'customer') {
    formData = {
      customer_email: employee_email, // reuse same input state
      customer_hash: employee_password // reuse same input state
    };
  } else {
    setServerError('Please select a user type');
    return;
  }

  try {
    let response;
    if (userType === 'employee') {
      response = await employeeService.loginEmployee(formData);
    } else if (userType === 'customer') {
      response = await employeeService.loginCustomer(formData);
    }

    const data = await response.json();
    console.log(data);

    if (data.message && (data.data?.employee_token || data.data?.customer_token)) {
      const tokenKey = userType === 'employee' ? 'employee' : 'customer';
      localStorage.setItem(tokenKey, JSON.stringify(data.data));

      setIsLogged(true);
      setEmployee(data.data); // you may want to rename to setUser for customer
      setSuccess(true);

      // Redirect
      navigate('/home');
    } else {
      setSuccess(false);
      setServerError(data.message || 'Login failed');
    }
  } catch (err) {
    console.log(err);
    setServerError('Invalid credentials!');
  }
};


  return (
    isUserTypeSelected ?(
      <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="d-flex flex-row">
              <div className="contact-form pr-3">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">

                    <div className="form-group col-md-12">
                      {serverError && <div className="validation-error color-red" role="alert">{serverError}</div>}
                      <input type="email" name="employee_email" value={employee_email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
                      {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="password" name="employee_password" value={employee_password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
                      {passwordError && <div className="validation-error" role="alert">{passwordError}</div>}
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Login</span></button>
                      {success && <div>successfully logged in</div>}
                    </div>
                  </div>
                  
                </form>
              </div>
              
                     <div>
                      <p>admin:ruthambaw610@gmail.com</p>
                      <p>customer:tole@gmail.com</p>
                      <p>employee:christy@gmail.com</p>
                      <p>passwords:123456789</p>
                    </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    ): <div className='d-flex flex-column align-items-center justify-content-center' style={{height: '50vh'}}>
        <h2 className='mb-4'>Select User Type to Login</h2>
        <select 
          value={userType} 
          onChange={(e) => {
            setUserType(e.target.value);
            setIsUserTypeSelected(true);
          }}
        >
          <option style={{ fontSize: "30px", padding: "10px" }} className="option-large" value="" disabled>Select user type</option>
          <option value="employee">Employee</option>
          <option value="customer">Customer</option>
        </select>
    </div>
  );
}

export default LoginForm;
