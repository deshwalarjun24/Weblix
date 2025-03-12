import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-container">
          <button className="logo" onClick={() => window.scrollTo(0, 0)}>
            <img src="/Weblix-logo.png" alt="WEBLIX Logo" className="logo-image" />
          </button>
          <div className="company-name">
            <span className="company-name-text">WEBLIX</span>
            <span className="company-tagline">Your Freelancing Solution</span>
          </div>
        </div>
        <div className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 