
import Home from './markup/pages/home/Home';
import AddEmployee from './markup/pages/admin/employee/AddEmployee';
import { Route, Routes } from 'react-router';
import Login from './markup/pages/login/Login';
import './assets/template-assets/css/bootstrap.css';
import './assets/template-assets/css/style.css';
import './assets/template-assets/css/responsive.css';
import './assets/template-assets/css/color.css';
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/add-employee" element={<AddEmployee />} />
    </Routes>
    </>
  )
}

export default App
