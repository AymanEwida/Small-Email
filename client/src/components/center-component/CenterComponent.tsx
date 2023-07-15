import React from 'react';

import './center-component.css';

interface CenterComponentProps {
  children : React.ReactNode,
  addTextCenter : boolean;
}

const CenterComponent: React.FC<CenterComponentProps> = ({ children, addTextCenter }) => {
  return (
    <div className='grid place-items-center h-full'>
      <div className={`bg-black rounded-md p-5 ${addTextCenter ? 'text-center' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default CenterComponent;