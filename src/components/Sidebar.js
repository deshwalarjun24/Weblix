import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Weblix-logo.png'; // Import logo from assets

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <div className="logo-container">
          <Link to="/" className="logo" onClick={toggleSidebar}>
            <img src={logo} alt="WEBLIX Logo" className="logo-image" />
          </Link>
          <div className="sidebar-company-name">
            <span className="sidebar-company-text">
              <span className="web">W E B</span><span className="lix">L I X</span>
            </span>
            <span className="sidebar-tagline">WE WORK , YOU LEAD </span>
          </div>
        </div>
        <div className="sidebar-links">
          <Link to="/" onClick={toggleSidebar}>Home</Link>
          <Link to="/services" onClick={toggleSidebar}>Services</Link>
          <Link to="/projects" onClick={toggleSidebar}>Projects</Link>
          <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 