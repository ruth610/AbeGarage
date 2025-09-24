const api_url = import.meta.env.VITE_API_URL;

async function searchCustomers(value,loggedInEmployeeToken){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        }
    };
    const response = await fetch(`${api_url}/api/customers/search?search=${value}`, requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch customers');
    }
    const data = await response.json(); 
    return data
}
async function getVehiclesByCustomer(customerId, token) {
  const response = await fetch(`${api_url}/api/vehicle/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });
  return response.json();
}

async function addOrder(orderData, token) {
  const response = await fetch(`${api_url}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}
async function getAllOrders(token) {
  const response = await fetch(`${api_url}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}

async function getOrderById(orderId, token) {
  const response = await fetch(`${api_url}/api/order/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  });
  // console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}
async function getOrderByCustomerId(customerId, token) {
  const response = await fetch(`${api_url}/api/orders/customer/${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  });
  // console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}



const orderService = { getOrderById,getAllOrders,getOrderByCustomerId,searchCustomers, getVehiclesByCustomer, addOrder };
export default orderService;