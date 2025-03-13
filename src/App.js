import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Statistics from './components/Statistics';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import LoadingAnimation from './components/LoadingAnimation';
import ThemeToggle from './components/ThemeToggle';
import ProjectsPage from './components/ProjectsPage';

function App() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Hide loading animation after 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Close sidebar on scroll
    const handleScroll = () => {
      if (sidebarActive) {
        setSidebarActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sidebarActive]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (sidebarActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarActive]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  // Add this function to ensure the sidebar can be opened again
  const openSidebar = () => {
    setSidebarActive(true);
  };

  // Home page component
  const HomePage = () => (
    <>
      <LoadingAnimation loading={loading} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Sidebar active={sidebarActive} toggleSidebar={closeSidebar} />
      <div className={`overlay ${sidebarActive ? 'active' : ''}`} onClick={closeSidebar}></div>
      <Navbar toggleSidebar={openSidebar} />
      <Hero />
      <Services />
      <Statistics />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );

  return (
    <Router basename="/Weblix">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
