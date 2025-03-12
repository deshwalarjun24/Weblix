import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'John Smith',
      position: 'CEO, Tech Startup',
      text: 'WEBLIX helped us find the perfect developer for our project. The quality of work was exceptional!',
      rating: 5
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      text: 'The designers on WEBLIX are incredibly talented. They transformed our brand identity completely!',
      rating: 5
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      name: 'Michael Chen',
      position: 'Small Business Owner',
      text: 'Fast, reliable, and professional. WEBLIX made finding quality freelancers so much easier!',
      rating: 5
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-title">
        <h2>What Our Clients Say</h2>
        <p>Real feedback from satisfied customers</p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={testimonial.avatar} alt="Client" className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.position}</p>
              </div>
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <i className="fas fa-star" key={i}></i>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials; 