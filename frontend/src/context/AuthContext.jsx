const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const loggedInEmployee = getAuth();
    const loggedInCustomer = getCustomerAuth();

    if (loggedInEmployee && loggedInEmployee.employee_token) {
      setIsLogged(true);
      setEmployee(loggedInEmployee);
      if (loggedInEmployee.employee_role === 3) setIsAdmin(true);
    }

    if (loggedInCustomer && loggedInCustomer.customer_token) {
      setIsLogged(true);
      setCustomer(loggedInCustomer);
    }
  }, []);

  const login = (data, type) => {
    if (type === "employee") {
      localStorage.setItem("employee", JSON.stringify(data));
      setEmployee(data);
      setIsLogged(true);
      setIsAdmin(data.employee_role === 3);
    } else if (type === "customer") {
      localStorage.setItem("customer", JSON.stringify(data));
      setCustomer(data);
      setIsLogged(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("employee");
    localStorage.removeItem("customer");
    setIsLogged(false);
    setIsAdmin(false);
    setEmployee(null);
    setCustomer(null);
  };

  const value = {
    isLogged,
    isAdmin,
    employee,
    customer,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
