import SideBar from "../employee/SideBar";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  return (
    <>
        <div className='container-fluid'>
      
        <div className='row p-0 services-section'>
            <div className='col-md-3 admin-left-side'>
                <SideBar /> 
            </div>
            <div className="col-md-9 p-5 customer_table">
                <OrdersTable />
            </div>
    </div>

    </div>
    </>
  )
}

export default Orders;