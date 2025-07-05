const api_url = import.meta.env.VITE_API_URL;


const addService = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
//   console.log(requestOptions);
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
}

async function getAllServices(loggedInEmployeeToken){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        }
    };
    const response = await fetch(`${api_url}/api/services`, requestOptions);
    return response;
}

async function getServiceById(loggedInEmployeeToken, serviceId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        }
    };
    const response = await fetch(`${api_url}/api/service/${serviceId}`, requestOptions);
    return response.json();
}
const serviceService =  {addService, getAllServices, getServiceById};

export default serviceService;