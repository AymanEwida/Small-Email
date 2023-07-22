import React, { useState, useEffect } from 'react';

import './loading-component.css';

interface LoadingComponentProps {
  style : "line" | "circle" | "text" | "fallBack";
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
    
    case 'fallBack':
      return (
        <div className='w-full py-2 px-9 lg:px-12'>
          <div className='flex justify-between items-center pb-2 border-b-1 w-full border-inherit px-7'>
            <div className='rounded-md w-24 h-4 bg-gray-400' />
            <div className='rounded-md w-72 h-4 bg-gray-400' />
            <div className='rounded-md w-16 h-4 bg-gray-400' />
          </div>
          <div className='rounded-md w-96 h-10 mt-2 bg-gray-400' />
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