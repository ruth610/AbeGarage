const api_url = import.meta.env.VITE_API_URL;


const addVehicle = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
//   console.log(requestOptions);
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
}
const vehicleService =  {addVehicle};
export default vehicleService;