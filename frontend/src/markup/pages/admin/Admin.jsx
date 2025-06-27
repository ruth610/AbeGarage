import React from 'react'
import SideBar from './employee/SideBar';
import ServiceCard from '../../component/service/ServiceCard';

const Admin = () => {
  return (
    <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-5">
              <div className='sec-title style-two'>
                <h2 className='text-left'>Admin Dashboard</h2>
                <p className='text-left'>Bring to the table win-win survival to insure proactive dominations. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. </p>
              </div>
              <div className='row'>
                <ServiceCard name="Open for All" description="All Orders" icon="flaticon-power" direct=""/>
                    <ServiceCard name="Open for Leads" description="New Orders" icon="flaticon-gearbox" direct=""/>
                    <ServiceCard name="Open for Admins" description="Employees" icon="flaticon-brake-disc" direct=""/>
                    <ServiceCard name="Open for Admins" description="Add Employees" icon="flaticon-car-engine" direct="/admin/add-employee"/>
                    <ServiceCard name="Service and Repairs" description="Tyre & Wheels" icon="flaticon-tire" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Denting & Painting" icon="flaticon-spray-gun" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Tyre & Wheels" icon="flaticon-tire" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Denting & Painting" icon="flaticon-spray-gun" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Tyre & Wheels" icon="flaticon-tire" direct=""/>
              </div>
                    
                </div>
        </div>
    </div>
  )
}

export default Admin;