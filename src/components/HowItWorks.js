import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Post Your Project',
      description: 'Describe your project in detail and set your budget requirements.'
    },
    {
      number: 2,
      title: 'Choose a Freelancer',
      description: 'Review proposals from skilled freelancers and select the best match.'
    },
    {
      number: 3,
      title: 'Get Work Done',
      description: 'Collaborate effectively and get your project completed on time.'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-title">
        <h2>How It Works</h2>
        <p>Get started with WEBLIX in just a few simple steps</p>
      </div>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks; 