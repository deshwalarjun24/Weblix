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
          <img 
            src={`${process.env.PUBLIC_URL}/illustrator.jpg`} 
            alt="Digital Illustrator" 
            className="illustrator-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 