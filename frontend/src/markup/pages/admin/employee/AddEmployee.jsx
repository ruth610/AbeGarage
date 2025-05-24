import React from 'react'
import Layout from '../../../component/layout/Layout';
import SideBar from './SideBar';
import AddEmployeeForm from './AddEmployeeForm';

const AddEmployee = () => {
  return (
    <Layout>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <SideBar /> 
          </div>
        <div className='col-md-9 admin-right-side'>
          <AddEmployeeForm />
        </div>
        </div>
      
      </div>
        
    </Layout>
  )
}

export default AddEmployee;