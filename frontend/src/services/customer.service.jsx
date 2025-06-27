const api_url = import.meta.env.VITE_API_URL;


const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
//   console.log(requestOptions);
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
}

async function loginCustomer(formData){
    const requestOptions = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
    };

    const response = await fetch(`${api_url}/api/customer/login`,requestOptions);

    // if the response is ok then store the token in localStorage
    if(response.ok){
        localStorage.getItem('customer_token');
    }
    else{
        // if the response is not ok then remove the token from localStorage
        localStorage.removeItem('customer_token');
    }
    return response;
};

async function getAllCustomers(loggedInEmployeeToken){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        }
    };
    const response = await fetch(`${api_url}/api/customers`, requestOptions);
    return response;
}
async function updateCustomer(customer_id, formData){
  const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData)
    };
    const response = await fetch(`${api_url}/api/customer/${customer_id}`, requestOptions);
    return response;
}

async function getCustomerById(customer_id){
  const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${api_url}/api/customer/${customer_id}`, requestOptions);
    return response;
}


const customerService = {
  getCustomerById,
  updateCustomer,
  createCustomer,
  loginCustomer,
  getAllCustomers
};


export default customerService;