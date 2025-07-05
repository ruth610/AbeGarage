import React, { useEffect } from 'react';
import orderService from '../../../../services/order.service';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const OrdersTable = () => {
    const [orders,setOrders] = useState([]);
    const navigate = useNavigate();
    const fetchOrders = async(token)=>{
        const res = await orderService.getAllOrders(token);
        if (!res || res.length === 0) {
            console.log('No orders found');
            return [];
        }
        else{
            console.log('Orders fetched successfully:', res);
            setOrders(res);
        }

    }
    useEffect(()=>{
        const token = localStorage.getItem('employee');
        if (!token) {
            console.error('No employee token found');
            return;
        }
        fetchOrders(token.employee_token);
    },[])
    function handleEdit(item) {
        
    }
    function handleNavigate(item) {
        // window.location.href = `/admin/order/${item.order_id}`;
        navigate(`/admin/order/${item}`);
    }
  return (
    <>
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Orders</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
      <table className="table table-bordered">
        <thead className="thead-white">
            <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Received By</th>
            <th>View/Edit</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index) => (
            <tr key={order.order_id} className={index % 2? "dark_bg":"light_bg"}>
                <td>{order.order_id}</td>
                <td>{order.customer_first_name} {order.customer_last_name}</td>
                <td>{order.vehicle_model} <br />{order.vehicle_year} <br /> {order.vehicle_serial}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                {order.order_completed === 1 ? (
                    <span className="badge bg-success">Completed</span>
                ) : (
                    <span className="badge bg-warning text-dark">In progress</span>
                )}
                </td>
                <td>
                {order.employee_first_name} {order.employee_last_name}
                </td>
                <td>
                <td>
                <i
                  className="bi bi-pencil-square"
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEdit(item)}
                ></i>

                <i
                  className="bi bi-box-arrow-up-right"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNavigate(order.order_id)}
                ></i>
              </td>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

    </>
  )
}

export default OrdersTable;