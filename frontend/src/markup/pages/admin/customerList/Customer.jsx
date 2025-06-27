import React, { useEffect, useState } from 'react';
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    // Pagination logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const { employee } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!employee || !employee.employee_token) return;

      try {
        const res = await customerService.getAllCustomers(employee.employee_token);
        const data = await res.json();

        if (data.error) {
          setServerError(data.error);
          setLoading(false);
        } else {
          setCustomers(data);
          setServerError('');
          setLoading(false);
        }
      } catch (err) {
        setServerError('Network or server error.');
        setLoading(false);
      }
    };

      fetchCustomers();
    }, [employee]); // 🔁 re-run when employee becomes available

    useEffect(()=>{
      setCurrentPage(1);
    },[customers]);

    const handleEdit =  (item)=>{
      navigate(`/admin/customer/${item.customer_id}`);
    }

    const handleNavigate = (item)=>{
      navigate(`/admin/customer/profile/${item.customer_id}`);
    }
    // console.log(customers);
    function changeFormat(isoString){
      const date = new Date(isoString);

    // Adjusts to your local time
      const formatted = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).replace(',', ''); // Remove the comma
      return formatted;
    }
    
  return (
    <div>
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Add a new customer</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
        {/* a table that contains id fname, lname,email,addeddate,active status,edit row which contain both edit and link to another page */}
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Added Date</th>
              <th>Active Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(currentCustomers) && currentCustomers.map((item,index) => (
            <tr key={item.customer_id} className={index % 2? "dark_bg":"light_bg"}>
              <td>{item.customer_id}</td>
              <td>{item.customer_first_name}</td>
              <td>{item.customer_last_name}</td>
              <td>{item.customer_email}</td>
              <td>{changeFormat(item.added_date)}</td>
              <td>{item.active_customer_status ? 'YES' : 'NO'}</td>
              <td>
                <i
                  className="bi bi-pencil-square"
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEdit(item)}
                ></i>

                <i
                  className="bi bi-box-arrow-up-right"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNavigate(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
        <nav aria-label="Customer pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button className="page-link" onClick={() => setCurrentPage(1)}>« First</button>
            </li>
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>‹ Prev</button>
            </li>

            <li className="page-item active">
              <span className="page-link">{currentPage}</span>
            </li>

            <li className={`page-item ${indexOfLastCustomer >= customers.length && "disabled"}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next ›</button>
            </li>
            <li className={`page-item ${indexOfLastCustomer >= customers.length && "disabled"}`}>
              <button className="page-link" onClick={() => setCurrentPage(Math.ceil(customers.length / customersPerPage))}>Last »</button>
            </li>
          </ul>
        </nav>


    </div>
  )
}

export default Customer;