import React, { useState } from 'react';

import './tooltip-component.css';

interface TooltipComponentProps {
  children : React.ReactNode,
  message : string,
  direction ?: string
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({ children, message, direction }) => {
  let timeout: NodeJS.Timeout;

  const [isShow, setIsShow] = useState(false);

  function handleShow () {
    timeout = setTimeout(() => {
      setIsShow(true);
    }, 300);
  }

  function handleDisShow () {
    clearInterval(timeout);
    setIsShow(false);
  }

  return (
    <div
     className='tooltip-wrapper'
     onMouseEnter={handleShow}
     onMouseLeave={handleDisShow}
    >
      {children}
      {isShow ? (
        <div
         className={`tooltip-message ${direction || 'top'}`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}

export default TooltipComponent;