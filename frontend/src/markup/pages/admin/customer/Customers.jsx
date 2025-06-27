import React from "react";
import AddCustomerForm from "./CustomerForm";
import SideBar from "../employee/SideBar";

const Customers = () => {
  return (
    <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-5">
              
              <div className='row'>
                <AddCustomerForm />
                 </div>
                    
                </div>
        </div>
    </div>
  );
}

export default Customers; 