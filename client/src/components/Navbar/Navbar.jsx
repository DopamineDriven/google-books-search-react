import React from "react";
import './Navbar.css';
// import Container from '../Container/Container.jsx'
import ReactLogo from '../../images/Logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
            <a href="/" className="navbar-brands">
                <img src={ReactLogo} alt="react" className="img-fluid" height="99.66px" width="99.6px"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="/" className="navbar-brand">
                            Google Books Search
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="/saved" className="navbar-brand">
                            Saved
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="/search" className="navbar-brand">
                            Search
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
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