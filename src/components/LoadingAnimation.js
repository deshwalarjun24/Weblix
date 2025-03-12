import React from 'react';

const LoadingAnimation = ({ loading }) => {
  return (
    <div className={`loading-animation ${loading ? '' : 'hide'}`}>
      <div className="loader"></div>
    </div>
  );
};

export default LoadingAnimation; 