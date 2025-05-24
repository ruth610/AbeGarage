import React from 'react'
import bg from '../../../assets/template-assets/images/custom/banner/banner1.jpg';
import { Link } from 'react-router';
const UpperBanner = ({description1,description2}) => {
  return (
    <>
     <section className="video-section pt-24">
            <div data-parallax='{"y": 50}' className="sec-bg"
                style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="auto-container">
                <h5>Working since 1999</h5>
                <h2>{description1} <br /> {description2}</h2>
                <div className="video-box">
                    <div className="video-btn"><Link to="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                            className="overlay-link lightbox-image video-fancybox ripple"><i className="flaticon-play"></i></Link>
                    </div>
                    <div className="text">Watch intro video <br/> about us</div>
                </div>
            </div>
        </section>
    </>
  )
}

export default UpperBanner;