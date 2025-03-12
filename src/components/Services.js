import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description: 'Expert developers to build your website or web application with the latest technologies.'
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Design & Creative',
      description: 'Creative designers for logos, graphics, UI/UX, and all your visual needs.'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Digital Marketing',
      description: 'Marketing experts to help grow your business online and reach more customers.'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="section-title">
        <h2>Our Services</h2>
        <p>Find expert freelancers in various domains to help with your projects</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">
              <i className={service.icon}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services; 