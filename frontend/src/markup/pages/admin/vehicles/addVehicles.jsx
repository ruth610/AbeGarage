import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import vehicleService from '../../../../services/vehicles.service';
import { useAuth } from '../../../../context/AuthContext';

const AddVehicles = ({onDone}) => {
    const [make , setVehicleMake] = useState('');
    const [type , setVehicleType] = useState('');
    const [serial , setVehicleSerial] = useState('');
    const [mileage , setVehicleMileage] = useState('');
    const [color , setVehicleColor] = useState('');
    const [tag , setVehicleTag] = useState('');
    const [year , setVehicleYear] = useState('');
    const [model , setVehicleModel] = useState('');
    const navigate = useNavigate();
    const { employee } = useAuth();

    const [loading ,setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const customer_id = useParams().customer_id;
    console.log(customer_id);
    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = {
            customer_id: customer_id,
            vehicle_make: make,
            vehicle_model: model,
            vehicle_year: year,
            vehicle_type: type,
            vehicle_mileage: mileage,
            vehicle_serial: serial,
            vehicle_color: color,
            vehicle_tag: tag
        };
    let loggedInEmployeeToken = '';
        // Destructure the auth hook and get the token
    if (employee && employee.employee_token) {
        loggedInEmployeeToken = employee.employee_token;
    }
      vehicleService.addVehicle(formData, loggedInEmployeeToken)
      .then((res)=>res.json())
      .then((data)=>{
          if(data.error){
          setServerError(data.error);
          setLoading(false)
          }
          else{
          alert('Vehicle added successfully');
          setServerError('');
          setLoading(false);
          if (onDone) onDone(); // callback to close or refresh
          }
      });
    }
    

  return (
    <> 
    {/* make this to the left */}


    <div className="mt-5 mb-5 bg-white w-75 pt-3 ml-0 pl-3">
        {/* after this heading their is a red line horizontally aligned to it */}
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Add a new Vehicle</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
          {/* delete button  */}
          <button className='btn btn-danger ml-auto' onClick={onDone}>x</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_make" required value={make} onChange={event => setVehicleMake(event.target.value)} placeholder="Vehicle Make" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_year" required value={year} onChange={event => setVehicleYear(event.target.value)} placeholder="Vehicle Year" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_type" required value={type} onChange={event => setVehicleType(event.target.value)} placeholder="Vehicle Type" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_mileage" required value={mileage} onChange={event => setVehicleMileage(event.target.value)} placeholder="Vehicle Mileage" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_serial" required value={serial} onChange={event => setVehicleSerial(event.target.value)} placeholder="Vehicle Serial" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_color" required value={color} onChange={event => setVehicleColor(event.target.value)} placeholder="Vehicle Color" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_tag" required value={tag} onChange={event => setVehicleTag(event.target.value)} placeholder="Vehicle Tag" style={{width: '50%'}} />
          </div>
          <div className="form-group mb-4">
            <input type="text" className="form-control" id="vehicle_model" required value={model} onChange={event => setVehicleModel(event.target.value)} placeholder="Vehicle Model" style={{width: '50%'}} />
          </div>
          <button type="submit" className="theme-btn btn-style-one">{loading?<ClipLoader size={30} />:'ADD VEHICLE'}</button>
        </form>
      </div>
    </>
  )
}

export default AddVehicles;