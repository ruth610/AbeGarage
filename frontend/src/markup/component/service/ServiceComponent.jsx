import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceComponent = () => {
  return (
    <>
        <section className="services-section">
            <div className="auto-container">
                <div className="sec-title style-two">
                    <h2>Our Featured Services</h2>
                    <div className="text">Bring to the table win-win survival strategies to ensure proactive domination. At
                        the end of the day, going forward, a new normal that has evolved from generation X is on the
                        runway heading towards a streamlined cloud solution. </div>
                </div>
                <div className="row">
                    <ServiceCard name="Service and Repairs" description="Performance Upgrade" icon="flaticon-power" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Transmission Services" icon="flaticon-gearbox" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Break Repair & Service" icon="flaticon-brake-disc" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Engine Service & Repair" icon="flaticon-car-engine" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Tyre & Wheels" icon="flaticon-tire" direct=""/>
                    <ServiceCard name="Service and Repairs" description="Denting & Painting" icon="flaticon-spray-gun" direct=""/>
                </div>
            </div>
        </section>
    </>
  )
}

export default ServiceComponent;
                           