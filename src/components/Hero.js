import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Find the Perfect Freelancer for Your Project</h1>
          <p>Connect with skilled professionals from around the world. Get quality work done quickly and efficiently.</p>
          <a href="#services" className="btn-primary">Explore Services</a>
        </div>
        <div className="hero-image">
          <img src="https://cdn.pixabay.com/photo/2018/04/02/21/13/business-3285343_1280.png" alt="Freelancing Illustration" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 