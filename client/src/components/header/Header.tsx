import React from 'react';

import './header.css';

interface HeaderProps {
  category : string,
  textSize : string,
}

const Header: React.FC<HeaderProps> = ({ category, textSize }) => {
  return (
    <div className='w-full sticky z-index top-0 bg-secondary-dark-bg p-2'>
      <h1 className={`font-bold text-${textSize}`}>
        {category}
      </h1>
    </div>
  )
}

export default Header;