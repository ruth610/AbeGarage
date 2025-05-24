import React from 'react'

const AddEmployeeForm = () => {
  return (
    <>
        <div className="container mt-5 mb-5">
        {/* after this heading their is a red line horizontally aligned to it */}
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Add a new employee</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
        
        <form>
          <div className="form-group mb-4">
            <input type="email" className="form-control" id="email" placeholder="Employee email" style={{width: '50%'}}/>
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="fname" placeholder="Employee First Name" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="lname" placeholder="Employee Last Name" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="phone" placeholder="Employee phone (555 555 555)" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <select className="form-control" id="option" placeholder="Employee type" style={{width: '50%'}}>
              <option value="">---Select---</option>
              <option value="full-time">Employee</option>
              <option value="part-time">Customer</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <input type="password" className="form-control" id="password" placeholder="Password" style={{width: '50%'}} />
          </div>
          <button type="submit" className="theme-btn btn-style-one">ADD EMPLOYEE</button>
        </form>
      </div>
    </>
  )
}

export default AddEmployeeForm