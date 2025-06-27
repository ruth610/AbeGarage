import React from "react";
// Import the auth hook 
import LoginForm from "../../login/Login";
import { useAuth } from "../../../../context/AuthContext";
// Import the Login component 

function Employees() {
  // Destructure the auth hook 
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <h1>Employees Page</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

}

export default Employees; 