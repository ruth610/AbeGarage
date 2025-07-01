import React from 'react'
import { Link } from 'react-router';

const CustomerInfo = ({customer_first_name, customer_last_name, customer_email, customer_phone, active_customer, customer_id  }) => {
  return (
    <>
        <h4 className="mb-4 mt-1"><strong>{customer_first_name} {customer_last_name}</strong></h4>
        <p><strong>Email:</strong> {customer_email}</p>
          <p><strong>Phone Number:</strong> {customer_phone}</p>
          <p><strong>Active Customer:</strong> {active_customer === 1 ? "YES" : "NO"}</p>
          <p>
            <strong>Edit customer info: </strong>
            <Link to={`/admin/customer/${customer_id}`} className="text-danger">
              <i className="bi bi-pencil-square"></i>
            </Link>
          </p>

    </>
  )
}

export default CustomerInfo;