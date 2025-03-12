import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About WEBLIX</h3>
          <p>WEBLIX is your trusted platform for finding skilled freelancers and getting quality work done efficiently.</p>
          <div className="social-links">
            {/* Social media buttons with proper accessibility labels */}
            <button className="social-button" aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
            <button className="social-button" aria-label="Twitter"><i className="fab fa-twitter"></i></button>
            <button className="social-button" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
            <button className="social-button" aria-label="Instagram"><i className="fab fa-instagram"></i></button>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {/* These links have valid href values */}
            <li><a href="#services">Services</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            {/* Using buttons instead of empty href links for better accessibility */}
            <li><button className="footer-button" onClick={() => console.log('Web Development clicked')}>Web Development</button></li>
            <li><button className="footer-button" onClick={() => console.log('Design & Creative clicked')}>Design & Creative</button></li>
            <li><button className="footer-button" onClick={() => console.log('Digital Marketing clicked')}>Digital Marketing</button></li>
            <li><button className="footer-button" onClick={() => console.log('Content Writing clicked')}>Content Writing</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li><i className="fas fa-phone"></i> +1 234 567 890</li>
            <li><i className="fas fa-envelope"></i> contact@weblix.com</li>
            <li><i className="fas fa-map-marker-alt"></i> 123 Business Street, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WEBLIX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 