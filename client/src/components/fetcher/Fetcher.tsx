import React from 'react';

import './fetcher.css';

interface FetcherProps {
  icon : React.ReactElement,
  title : string,
  desc : string,
}

const Fetcher: React.FC<FetcherProps> = ({ icon, title, desc }) => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <span className='text-2xl bg-blue-500 p-2 rounded-full'>
        {icon}
      </span>
      <h2 className='text-lg font-semibold w-80 pl-4'>
        {title}
      </h2>
      <p className='text-gray-300 w-80 pl-4'>
        {desc}
      </p>
    </div>
  )
}

export default Fetcher;