import React from 'react';

import './header.css';

interface HeaderProps {
  category : string,
}

const Header: React.FC<HeaderProps> = ({ category }) => {
  return (
    <div className='w-full sticky top-0 bg-secondary-dark-bg p-2'>
      <h1 className='font-bold text-lg'>
        {category}
      </h1>
    </div>
  )
}

export default Header;