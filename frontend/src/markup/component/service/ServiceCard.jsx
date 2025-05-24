import React from 'react'

const ServiceCard = ({ name, description,icon }) => {
  return (
    <>
        <div className="col-lg-4 service-block-one">
            <div className="inner-box hvr-float-shadow">
                <h5>{name}</h5>
                <h2>{description}</h2>
                <a href="#" className="read-more">read more +</a>
                <div className="icon"><span className={icon}></span></div>
            </div>
        </div>
    </>
  )
}

export default ServiceCard