import React from 'react'
import { Link } from 'react-router'

const ServiceCard = ({ name, description,icon,direct }) => {
  return (
    <>
        <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
              <Link to={direct}>
                <h5>{name}</h5>
                <h2>{description}</h2>
                <a href="#" className="read-more">read more +</a>
                <div className="icon"><span className={icon}></span></div>
              </Link>
                
            </div>
        </div>
    </>
  )
}

export default ServiceCard