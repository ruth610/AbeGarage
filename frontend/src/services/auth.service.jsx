const api_url = import.meta.env.VITE_API_URL;


const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
//   console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}

async function loginEmployee(formData){
    const requestOptions = {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
    };

    const response = await fetch(`${api_url}/api/employee/login`,requestOptions);

    // if the response is ok then store the token in localStorage
    if(response.ok){
        localStorage.getItem('employee_token');
    }
    else{
        // if the response is not ok then remove the token from localStorage
        localStorage.removeItem('employee_token');
    }
    return response;
};
const employeeService = {
    createEmployee,
    loginEmployee
}
export default employeeService;