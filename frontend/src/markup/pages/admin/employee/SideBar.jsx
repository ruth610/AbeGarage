import React from 'react'
import { Link } from 'react-router-dom';
import '../../../../assets/styles/custom.css';
const SideBar = () => {
  return (
    <>     
        <div className="menu-box">
                <div className='admin-menu'>
                    <h2>ADMIN MENU</h2>
                </div>
            	<div className='group-list'>
                	<Link to="#introduction" className='list-group-item'>Dashboard </Link>
                    <Link to="#html-structure" className='list-group-item'>Orders</Link>
                    <Link to="#css-structure" className='list-group-item'>New Order</Link>
                    <Link to="#javascript" className='list-group-item'>Add Employees </Link>
					<Link to="#map-settings" className='list-group-item'>Employees</Link>
                    <Link to="/admin/add-customer" className='list-group-item'>Add Customers</Link>
                    <Link to="/admin/customers" className='list-group-item'>Customers </Link>
                    <Link to="#support" className='list-group-item'>Services </Link>
                </div>
                
        </div>
        
    </>
  )
}

export default SideBar;