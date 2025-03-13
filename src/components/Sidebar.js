import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Weblix-logo.png';

const Sidebar = ({ active, toggleSidebar }) => {
  return (
    <div className={`sidebar ${active ? 'active' : ''}`}>
      <div className="sidebar-close" onClick={toggleSidebar} aria-label="Close menu">
        <i className="fas fa-times"></i>
      </div>
      <div className="sidebar-header">
        <Link to="/" onClick={toggleSidebar}>
          <img src={logo} alt="WEBLIX Logo" className="sidebar-logo-image" />
        </Link>
        <div className="sidebar-company-name">
          <span className="sidebar-company-text">WEBLIX</span>
          <span className="sidebar-tagline">Your Freelancing Solution</span>
        </div>
      </div>
      <div className="sidebar-links">
        <a href="#services" onClick={toggleSidebar}>
          <i className="fas fa-cogs"></i> Services
        </a>
        <a href="#how-it-works" onClick={toggleSidebar}>
          <i className="fas fa-question-circle"></i> How It Works
        </a>
        <Link to="/projects" onClick={toggleSidebar}>
          <i className="fas fa-briefcase"></i> Projects
        </Link>
        <a href="#testimonials" onClick={toggleSidebar}>
          <i className="fas fa-comment-alt"></i> Testimonials
        </a>
        <a href="#contact" onClick={toggleSidebar}>
          <i className="fas fa-envelope"></i> Contact
        </a>
      </div>
      <div className="sidebar-footer">
        <p>© {new Date().getFullYear()} WEBLIX</p>
      </div>
    </div>
  );
};

export default Sidebar; 