import React, { useState, useEffect, useRef } from 'react';

const Statistics = () => {
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: '50K+', label: 'Freelancers' },
    { number: '100K+', label: 'Projects Completed' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '30+', label: 'Countries' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    // Store the current value in a variable to use in cleanup
    const currentStatsRef = statsRef.current;

    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [animated]);

  const animateStats = () => {
    setAnimated(true);
  };

  return (
    <section className="statistics" ref={statsRef}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics; 