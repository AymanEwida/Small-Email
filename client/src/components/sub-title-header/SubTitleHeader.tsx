import React from 'react';

import './sub-title-header.css';

interface SubTitleHeaderProps {
  subTitle : string,
}

const SubTitleHeader: React.FC<SubTitleHeaderProps> = ({ subTitle }) => {
  return (
    <>
      <h1 className='text-2xl text-blue-400 font-bold'>
        Small Email
      </h1>
      <h2 className='text-lg mt-2 text-gray-400 font-medium'>
        {subTitle}
      </h2>
    </>
  )
}

export default SubTitleHeader;