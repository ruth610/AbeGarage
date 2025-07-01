
import Home from './markup/pages/home/Home';
import AddEmployee from './markup/pages/admin/employee/AddEmployee';
import { Route, Routes } from 'react-router';
import Login from './markup/pages/login/Login';
import './assets/template-assets/css/bootstrap.css';
import './assets/template-assets/css/style.css';
import './assets/template-assets/css/responsive.css';
import './assets/template-assets/css/color.css';
import UnAuthorized from './markup/pages/UnAutherized';
import PrivateAuthRoute from './markup/component/auth/PrivateAuthRoute';
import Employees from './markup/pages/admin/employee/Employees';
import Customers from './markup/pages/admin/customer/Customers';
import Order from './markup/pages/admin/order/NewOrder';
import Header from './markup/component/header/Header';
import Footer from './markup/component/footer/Footer';
import ServiceComponent from './markup/component/service/ServiceComponent';
import Service from './markup/pages/service/Service';
import Admin from './markup/pages/admin/Admin';
import Customer from './markup/pages/admin/customerList/Customer';
import CustomersList from './markup/pages/admin/customerList/CustomersList';
import UpdateCustomer from './markup/pages/admin/updateCustomer/UpdateCustomer';
import CustomerProfile from './markup/pages/admin/customerProfile/CustomerProfile';
import CustomerProfileList from './markup/pages/admin/customerProfile/CustomerProfileList';
import ServicePage from './markup/pages/admin/service/ServicePage';
function App() {


  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Service />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="/admin"
        element={
          <PrivateAuthRoute roles={[3]}>
            <Admin />
          </PrivateAuthRoute>
        } />
      {/* // Add the Orders Route  */}
      <Route path="/admin/orders"
        element={
          <PrivateAuthRoute roles={[1, 2, 3]}>
            <Order />
          </PrivateAuthRoute>
        } />
      {/* // Add the Customers Route  */}
      <Route path="/admin/add-customer"
        element={
          <PrivateAuthRoute roles={[2, 3]}>
            <Customers />
          </PrivateAuthRoute>
        } />
        <Route path='/admin/customer/:customer_id' element={<UpdateCustomer />} />
        <Route path='/admin/customer/profile/:customer_id' element={<CustomerProfileList />} />
        <Route path="/admin/customers"
        element={
          <PrivateAuthRoute roles={[2, 3]}>
            <CustomersList />
          </PrivateAuthRoute>
        } />
      {/* // Add the Employees Route  */}
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/add-employee"
        element={
          <PrivateAuthRoute roles={[3]}>
            <AddEmployee />
          </PrivateAuthRoute>
        } />
        <Route path="/admin/services"
        element={
          <PrivateAuthRoute roles={[3]}>
            <ServicePage />
          </PrivateAuthRoute>
        } />
      {/* 
        Customers (/admin/customers) - managers and admins
        Orders (/admin/orders) - Can be accessed by all employees
        Add employee (/admin/add-employee) - admins only 
          - Admin: 3 
          - Manager: 2 
          - Employee: 1 
      */}
          </Routes>
          <Footer></Footer>
    </>
  )
}

export default App
