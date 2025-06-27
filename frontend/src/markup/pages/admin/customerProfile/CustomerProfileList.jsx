import React from 'react'
import CustomerProfile from './CustomerProfile'
import SideBar from '../employee/SideBar';

const CustomerProfileList = () => {
  return (
    <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-3">
                <CustomerProfile />
        </div>
    </div>
    </div>
  )
}

export default CustomerProfileList;