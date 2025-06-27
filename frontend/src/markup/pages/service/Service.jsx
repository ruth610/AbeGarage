import React from 'react'
import ServiceComponent from '../../component/service/ServiceComponent';
import WhyChooseUs from '../../component/features/WhyChooseUs';
import UpperBanner from '../../component/Upperbanner/UpperBanner';
import CTA from '../../component/features/CTA';

const Service = () => {
  return (
    <>
      <ServiceComponent />
      <WhyChooseUs />
      <UpperBanner description1="We are leader" description2="in Car Mechanical Work" />
      <CTA />
    </>
  )
}

export default Service;