import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
    </div>
  );
};

export default ThemeToggle; 