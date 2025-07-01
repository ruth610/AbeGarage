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

const orderService = { searchCustomers, getVehiclesByCustomer };
export default orderService;