import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  // Sample project data - you can replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web Development',
      image: 'https://via.placeholder.com/600x400?text=E-commerce+Project',
      description: 'A fully responsive e-commerce platform with payment integration, user authentication, and product management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile Fitness App',
      category: 'Mobile Development',
      image: 'https://via.placeholder.com/600x400?text=Fitness+App',
      description: 'A fitness tracking application that helps users monitor their workouts, nutrition, and progress.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Health API'],
      link: '#'
    },
    {
      id: 3,
      title: 'Corporate Website Redesign',
      category: 'UI/UX Design',
      image: 'https://via.placeholder.com/600x400?text=Website+Redesign',
      description: 'Complete redesign of a corporate website focusing on user experience, accessibility, and modern design principles.',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'WordPress'],
      link: '#'
    },
    {
      id: 4,
      title: 'Inventory Management System',
      category: 'Software Development',
      image: 'https://via.placeholder.com/600x400?text=Inventory+System',
      description: 'A comprehensive inventory management system for small to medium businesses with reporting and analytics.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Chart.js'],
      link: '#'
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      category: 'Web Development',
      image: 'https://via.placeholder.com/600x400?text=Social+Dashboard',
      description: 'A dashboard that aggregates data from multiple social media platforms for analytics and content management.',
      technologies: ['Vue.js', 'Express', 'Social APIs', 'D3.js'],
      link: '#'
    },
    {
      id: 6,
      title: 'Real Estate Listing App',
      category: 'Full Stack Development',
      image: 'https://via.placeholder.com/600x400?text=Real+Estate+App',
      description: 'A property listing application with advanced search, map integration, and virtual tours.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="section-title">
        <h2>Our Projects</h2>
        <p>Explore our portfolio of successful projects delivered with excellence</p>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href={project.link} className="project-link">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="explore-more-container">
        <Link to="/projects" className="btn-primary explore-more-btn">
          Explore More Projects <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
};

export default Projects; 