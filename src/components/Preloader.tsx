import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHidden(true);
    }, 1000); // Show preloader for 1s

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div
      id="preloader"
      className={hidden ? 'hidden' : ''}
      style={{
        display: hidden ? 'none' : 'flex',
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;