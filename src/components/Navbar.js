import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Weblix-logo.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src={logo} alt="WEBLIX Logo" className="logo-image" />
          </Link>
          <div className="company-name">
            <span className="company-name-text">WEBLIX</span>
            <span className="company-tagline">Your Freelancing Solution</span>
          </div>
        </div>
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </button>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/projects">Projects</Link>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 