import React from 'react'
import SideBar from '../employee/SideBar';
import Customer from './Customer';

const CustomersList = () => {
  return (
    <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-5 customer_table">
              
                    <Customer />
                    
            </div>
    </div>

    </div>
  )
}

export default CustomersList;