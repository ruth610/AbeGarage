import React, { useState, useEffect, useContext } from "react";
import getAuth from '../util/auth.jsx';
import getCustomerAuth from "../util/customer_auth.jsx";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        // Check employee login
        const loggedInEmployee = await getAuth();
        if (loggedInEmployee && loggedInEmployee.employee_token) {
          setIsLogged(true);
          setEmployee(loggedInEmployee);
          if (loggedInEmployee.employee_role === 3) {
            setIsAdmin(true);
          }
        }

        // Check customer login
        const loggedInCustomer = await getCustomerAuth();
        if (loggedInCustomer && loggedInCustomer.customer_token) {
          setIsLogged(true);
          setCustomer(loggedInCustomer);
        }
      } catch (err) {
        console.error("Auth fetch error:", err);
      }
    };

    fetchAuth();
  }, []);

  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    employee,
    setEmployee,
    customer,
    setCustomer
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;