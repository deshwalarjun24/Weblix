import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Weblix-logo.png'; // Import logo from assets

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo} alt="WEBLIX Logo" className="logo-image" />
          </Link>
          <div className="company-name">
            <span className="company-name-text">
              <span className="web">W E B</span><span className="lix">L I X</span>
            </span>
            <span className="company-tagline">WE WORK , YOU LEAD </span>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </button>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 