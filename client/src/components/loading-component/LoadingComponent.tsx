import React, { useState, useEffect } from 'react';

import './loading-component.css';

interface LoadingComponentProps {
  style : "line" | "circle" | "text";
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ style }) => {

  let interval: NodeJS.Timer;

  const [dots, setDots] = useState('');

  function handleDots (): ReturnType<typeof setInterval> {
    return setInterval(() => {
      if (dots.length >= 3) {
        setDots('');
      }else {
        setDots(prevDots => prevDots+'.')
      }
      console.log({dots});
    }, 500); 
  }

  useEffect(() => {
    interval = handleDots();

    return () => {
      clearInterval(interval);
    }
  }, [dots]);

  switch (style) {
    case 'line':
      return (
        <div className='loading-line' />
      );
    
    case 'circle':
      return (
        <div className='loading-circle' />
      );
    
    case 'text':
      return (
        <div>
          Loading{dots}
        </div>
      );

    default:
      return (
        <div>
          Loading...
        </div>
      );
  }
}

export default LoadingComponent;