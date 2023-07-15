import React from 'react';

import './center-component.css';

interface CenterComponentProps {
  children : React.ReactNode
}

const CenterComponent: React.FC<CenterComponentProps> = ({ children }) => {
  return (
    <div className='grid place-items-center h-full'>
      <div className='bg-black rounded-md p-5 text-center'>
        {children}
      </div>
    </div>
  )
}

export default CenterComponent;