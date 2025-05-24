import React from 'react'
import Layout from '../../component/layout/Layout';
const Login = () => {
  return (
    <Layout>
      {/* login form with bootstrap */}
      <div className="container mt-5 mb-5">
        {/* after this heading their is a red line horizontally aligned to it */}
        <div className='d-flex align-items-baseline'> {/*decrease the gap between heading and line */}
          <h2 className='mr-3 font-weight-bold mb-5'>Login to Your Account</h2>
          <hr style={{ border: '1px solid red', width: '5%' }} />
        </div>
        
        <form>
          <div className="form-group mb-4">
            <input type="email" className="form-control" id="email" placeholder="Enter email" style={{width: '50%'}}/>
          </div>
          <div className="form-group mb-4">
            <input type="password" className="form-control" id="password" placeholder="Password" style={{width: '50%'}} />
          </div>
          <button type="submit" className="theme-btn btn-style-one">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login