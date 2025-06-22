import React from 'react'
import Layout from '../../component/layout/Layout';
import UpperBanner from '../../component/Upperbanner/UpperBanner';
import AboutC from '../../component/about/AboutC';
import ServiceComponent from '../../component/service/ServiceComponent';
import Feature from '../../component/features/Feature';
import WhyChooseUs from '../../component/features/WhyChooseUs';
import CTA from '../../component/features/CTA';

const Home = () => {
  return (
    <div>
        <UpperBanner description1="Tuneup Your Car" description2="to Next Level" />
        <AboutC />
        <ServiceComponent />
        <Feature />
        <WhyChooseUs />
        <CTA />
        <UpperBanner description1="We are leader" description2="in Car Mechanical Work" />
    </div>
  )
}

export default Home;