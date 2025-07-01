import React from 'react'
import ServiceList from './ServiceList'
import SideBar from '../employee/SideBar'

const ServicePage = () => {
  return (
    <>
        <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-3">
                <ServiceList />
        </div>
    </div>
    </div>
    </>
  )
}

export default ServicePage