import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <>
        <footer className="main-footer">
            {/* Upper Box */}
            <div className="upper-box">
                <div className="auto-container">
                    <div className="row no-gutters">

                        {/* Footer Info Box */}
                        <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
                            <div className="info-inner">
                                <div className="content">
                                    <div className="icon">
                                        <span className="flaticon-pin"></span>
                                    </div>
                                    <div className="text">54B, Tailstoi Town 5238 MT, <br/> La city, IA 522364</div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info Box */}
                        <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
                            <div className="info-inner">
                                <div className="content">
                                    <div className="icon">
                                        <span className="flaticon-email"></span>
                                    </div>
                                    <div className="text">Email us : <br/> <a
                                            href="mailto:contact.contact@autorex.com">contact@autorex.com</a></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info Box */}
                        <div className="footer-info-box col-md-4 col-sm-6 col-xs-12">
                            <div className="info-inner">
                                <div className="content">
                                    <div className="icon">
                                        <span className="flaticon-phone"></span>
                                    </div>
                                    <div className="text">Call us on : <br/><strong>+ 1800 456 7890</strong></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Widgets Section */}
            <div className="widgets-section">
                <div className="auto-container">
                    <div className="widgets-inner-container">
                        <div className="row clearfix">

                            {/* Footer Column */}
                            <div className="footer-column col-lg-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="widget widget_links">
                                            <h4 className="widget_title">Usefull Links</h4>
                                            <div className="widget-content">
                                                <ul className="list">
                                                    <li><Link to="/">Home</Link></li>
                                                    <li><Link to="/about">About Us</Link></li>
                                                    <li><Link to="/appointment">Appointment</Link></li>
                                                    <li><Link to="/testimonial">Testimonials</Link></li>
                                                    <li><Link to="/contact">Contact Us</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="widget widget_links">
                                            <h4 className="widget_title">Our Services</h4>
                                            <div className="widget-content">
                                                <ul className="list">
                                                    <li><Link to="#">Performance Upgrade</Link></li>
                                                    <li><Link to="#">Transmission Service</Link></li>
                                                    <li><Link to="#">Break Repair & Service</Link></li>
                                                    <li><Link to="#">Engine Service & Repair</Link></li>
                                                    <li><Link to="#">Tyre & Wheels</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Column */}
                            <div className="footer-column col-lg-4">
                                <div className="widget widget_newsletter">
                                    <h4 className="widget_title">Newsletter</h4>
                                    <div className="text">Get latest updates and offers.</div>
                                    <div className="newsletter-form">
                                        <form className="ajax-sub-form">
                                            <div className="form-group">
                                                <input type="email" placeholder="Enter your email"
                                                    id="subscription-email"/>
                                                <button className="theme-btn" type="submit"><span
                                                        className="fas fa-paper-plane"></span></button>
                                                <label className="subscription-label" for="subscription-email"></label>
                                            </div>
                                        </form>
                                    </div>
                                    <ul className="social-links">
                                        <li><Link to="#"><span className="fab fa-facebook-f"></span></Link></li>
                                        <li><Link to="#"><span className="fab fa-linkedin-in"></span></Link></li>
                                        <li><Link to="#"><span className="fab fa-twitter"></span></Link></li>
                                        <li><Link to="#"><span className="fab fa-google-plus-g"></span></Link></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="auto-container">
                <div className="footer-bottom">
                    <div className="copyright-text">© Copyright <a href="#">Autorex</a> 2020 . All right reserved.</div>
                    <div className="text">Created by <a href="#">ThemeArc</a></div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer;