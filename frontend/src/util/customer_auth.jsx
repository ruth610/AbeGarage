const getCustomerAuth = async () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  if (customer && customer.customer_token) {
    const decoded = decodeTokenPayload(customer.customer_token);
    console.log(customer);
    customer.customer_id = decoded.customer_id;
    customer.customer_first_name = decoded.customer_first_name;
    customer.customer_last_name = decoded.customer_last_name;
    customer.customer_email = decoded.customer_email;
    customer.customer_phone = decoded.customer_phone;
    customer.customer_active_status = decoded.customer_active_status;

    return customer;
  }
  return {};
};


// Function to decode the payload from the token
// The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
const decodeTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default getCustomerAuth;