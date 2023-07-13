import React from 'react';

import { socialMediaLinks } from './socialMediaLinksData';

import './footer.css';

const Footer: React.FC = () => {
  return (
    <div className='w-full bg-black py-4 grid place-items-center'>
      <h1 className='text-lg font-bold text-gray-500'>
        Small Email
      </h1>
      <h3 className='text-md my-2 text-gray-400'>
        Contact us
      </h3>
      <div className='flex flex-row gap-4'>
        {socialMediaLinks.map((socialMediaLink, index) => (
          <a 
           key={index}
           href={socialMediaLink.link}
           className='hover:bg-gray-700 p-2 rounded-full text-blue-300'
          >
            {socialMediaLink.icon}
          </a>
        ))}
      </div>
      <p className='mt-3 text-gray-400'>
        Our Emails: {"<"}smallEmail@smail.com{">"} {' '} / {' '} {"<"}smallEmail@gmail.com{">"}
      </p>
    </div>
  )
}

export default Footer;