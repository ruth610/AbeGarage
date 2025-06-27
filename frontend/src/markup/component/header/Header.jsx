import React, { useEffect } from 'react';
import icon_bar from '../../../assets/template-assets/images/icons/icon-bar.png';
import logo from '../../../assets/template-assets/images/custom/logo.png';
import { Link } from 'react-router-dom';
import '../../../assets/styles/custom.css';
import {useAuth} from '../../../context/AuthContext';

const Header = () => {
    const {isLogged, isAdmin,employee,setIsLogged} = useAuth();
    // console.log(isAdmin);
    const handleClick = ()=>{
        
        setIsLogged(false);
        localStorage.removeItem('employee');
    }
    
  return (
    <header className="main-header header-style-one">

            {/* Header Top */}
            <div className="header-top">
                <div className="auto-container">
                    <div className="inner-container">
                        <div className="left-column">
                            <div className="text">Enjoy the Beso while we fix your car</div>
                            <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
                        </div>
                        <div className="right-column">
                            <div className="phone-number">{isLogged?'Welcome, ' + employee?.employee_first_name:'Schedule Your Appontment Today '}: <strong>1800 456 7890</strong>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Header Upper */}

            <div className="header-upper sticky-top">
                <div className="auto-container">
                    <div className="inner-container">
                        {/* Logo */}
                        <div className="logo-box">
                            <div className="logo"><Link to="/"><img src={logo} alt="Logo"/></Link>
                            </div>
                        </div>
                        <div className="right-column">
                            {/* Nav Box */}
                            <div className="nav-outer">
                                {/* Mobile Navigation Toggler */}
                                <div className="mobile-nav-toggler"><img src={icon_bar} alt="Menu"/>
                                </div>

                                 {/* Main Menu  */}
                                <nav className="main-menu navbar-expand-md navbar-light">
                                    <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                        <ul className="navigation">
                                            <li className="dropdown"><Link to="/">Home</Link>
                                            </li>
                                            <li className="dropdown"><Link to="/about">About Us</Link>
                                            </li>
                                            <li className="dropdown"><Link to="/services">Services</Link>
                                            </li>
                                            <li><Link to="/contact">Contact Us</Link></li>
                                            {isAdmin && <li><Link to="/admin">ADMIN</Link></li>}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="search-btn"></div>
                            <div className="link-btn"><Link to={isLogged?'':'/login'} className="theme-btn btn-style-one" onClick={handleClick}>{isLogged?'LogOut':'Login'}</Link></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-menu">
                <div className="menu-backdrop"></div>
                <div className="close-btn"><span className="icon flaticon-remove"></span></div>

                <nav className="menu-box">
                    <div className="nav-logo"><Link to="/"><img src={logo} alt="Logo"
                                title="Logo"/></Link></div>
                    <div className="menu-outer">
                        
                    </div>

                </nav>
            </div>

            <div className="nav-overlay">
                <div className="cursor"></div>
                <div className="cursor-follower"></div>
            </div>
        </header>
  )
}

export default Header