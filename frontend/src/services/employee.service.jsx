const api_url = import.meta.env.VITE_API_URL;

async function getActiveEmployees(loggedInEmployeeToken){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedInEmployeeToken
        }
    };
    const response = await fetch(`${api_url}/api/employee/active`, requestOptions);
    if (!response.ok) {
        throw new Error('Failed to fetch active employees');
    }
    const data = await response.json();
    return data;
}

const employeeService = {
    getActiveEmployees
};

export default employeeService;