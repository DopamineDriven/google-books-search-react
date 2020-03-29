import React from "react";
import './Navbar.css';
// import Container from '../Container/Container.jsx'
import ReactLogo from '../../images/Logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

    // use state expanded and setExpanded onClick
    // circle back
  return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <Link
                to="/" 
                className="navbar-brand">
                <img src={ReactLogo} alt="react" className="img-fluid" height="99.66px" width="99.6px"/>
            </Link>
            
            {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={
                                window.location.pathname === "/" || window.location.pathname === "/search"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Search
                        </Link>
                    </li>
                    &nbsp;|&nbsp;
                    <li className="nav-item">
                        <Link
                            to="/saved" 
                            className={
                                window.location.pathname === "/saved"
                                ? "nav-link active"
                                : "nav-link"
                            }>
                            Saved
                        </Link>
                    </li>
                </ul>
           {/* </div> */}
    </nav>
    </React.Fragment>
  )
}

export default Navbar;

/* <div className="header" style={{height: '75px', position: 'relative'}}>
<Layout fluid>
    <Header transparent >
      <Navigation className="Navbar">
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
            <a href="/portfolio">Portfolio</a>
      </Navigation>
    </Header>
    <Content />
</Layout>
</div> */