import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import Contact from './Contact';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'game', name: 'Game Development' },
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'posters', name: 'Posters & Graphics' },
    { id: 'templates', name: 'Templates' },
    { id: 'branding', name: 'Branding' }
  ];

  // Sample project data - you can replace with your actual projects
  const allProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://via.placeholder.com/600x400?text=E-commerce+Project',
      description: 'A fully responsive e-commerce platform with payment integration, user authentication, and product management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Mobile Fitness App',
      category: 'mobile',
      image: 'https://via.placeholder.com/600x400?text=Fitness+App',
      description: 'A fitness tracking application that helps users monitor their workouts, nutrition, and progress.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Health API'],
      link: '#'
    },
    {
      id: 3,
      title: 'Corporate Website Redesign',
      category: 'uiux',
      image: 'https://via.placeholder.com/600x400?text=Website+Redesign',
      description: 'Complete redesign of a corporate website focusing on user experience, accessibility, and modern design principles.',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'WordPress'],
      link: '#'
    },
    {
      id: 4,
      title: 'Inventory Management System',
      category: 'web',
      image: 'https://via.placeholder.com/600x400?text=Inventory+System',
      description: 'A comprehensive inventory management system for small to medium businesses with reporting and analytics.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Chart.js'],
      link: '#'
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      category: 'web',
      image: 'https://via.placeholder.com/600x400?text=Social+Dashboard',
      description: 'A dashboard that aggregates data from multiple social media platforms for analytics and content management.',
      technologies: ['Vue.js', 'Express', 'Social APIs', 'D3.js'],
      link: '#'
    },
    {
      id: 6,
      title: 'Real Estate Listing App',
      category: 'mobile',
      image: 'https://via.placeholder.com/600x400?text=Real+Estate+App',
      description: 'A property listing application with advanced search, map integration, and virtual tours.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      link: '#'
    },
    {
      id: 7,
      title: 'Adventure Game',
      category: 'game',
      image: 'https://via.placeholder.com/600x400?text=Adventure+Game',
      description: 'An immersive adventure game with rich storytelling, challenging puzzles, and stunning visuals.',
      technologies: ['Unity', 'C#', 'Blender', 'Adobe Photoshop'],
      link: '#'
    },
    {
      id: 8,
      title: 'Mobile RPG Game',
      category: 'game',
      image: 'https://via.placeholder.com/600x400?text=Mobile+RPG',
      description: 'A role-playing game for mobile devices with character customization, quests, and multiplayer features.',
      technologies: ['Unity', 'C#', 'Firebase', 'Photon'],
      link: '#'
    },
    {
      id: 9,
      title: 'Corporate Branding Package',
      category: 'branding',
      image: 'https://via.placeholder.com/600x400?text=Corporate+Branding',
      description: 'Complete branding package including logo design, color palette, typography, and brand guidelines.',
      technologies: ['Adobe Illustrator', 'Adobe InDesign', 'Figma'],
      link: '#'
    },
    {
      id: 10,
      title: 'Event Poster Series',
      category: 'posters',
      image: 'https://via.placeholder.com/600x400?text=Event+Posters',
      description: 'A series of eye-catching posters for a music festival, designed to capture attention and convey information effectively.',
      technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Procreate'],
      link: '#'
    },
    {
      id: 11,
      title: 'Resume Templates',
      category: 'templates',
      image: 'https://via.placeholder.com/600x400?text=Resume+Templates',
      description: 'A collection of professional resume templates designed for different industries and career levels.',
      technologies: ['Adobe InDesign', 'Microsoft Word', 'Canva'],
      link: '#'
    },
    {
      id: 12,
      title: 'Social Media Kit',
      category: 'templates',
      image: 'https://via.placeholder.com/600x400?text=Social+Media+Kit',
      description: 'A comprehensive social media kit with templates for posts, stories, and profile images across multiple platforms.',
      technologies: ['Adobe Photoshop', 'Canva', 'Figma'],
      link: '#'
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="projects-page">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={closeSidebar} />
      <div className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <Navbar toggleSidebar={openSidebar} />
      
      <div className="projects-hero">
        <div className="projects-hero-content">
          <h1>Our Projects</h1>
          <p>Explore our portfolio of successful projects delivered with excellence</p>
        </div>
      </div>
      
      <div className="projects-container">
        <div className="projects-categories">
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <button 
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
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
                <span className="project-category">{categories.find(cat => cat.id === project.category)?.name}</span>
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
      </div>
      
      <div className="back-to-home">
        <Link to="/" className="btn-primary">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default ProjectsPage; 