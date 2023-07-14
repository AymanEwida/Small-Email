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
      <ul className='flex flex-row gap-4 list-none'>
        {socialMediaLinks.map((socialMediaLink, index) => (
          <li 
           key={index}
           className='hover:bg-gray-700 p-2 rounded-full text-blue-300' 
          >
            <a href={socialMediaLink.link}>
              {socialMediaLink.icon}
            </a>
          </li>
        ))}
      </ul>
      <p className='mt-3 text-gray-400'>
        Our Emails: {"<"}smallEmail@smail.com{">"} {' '} / {' '} {"<"}smallEmail@gmail.com{">"}
      </p>
    </div>
  )
}

export default Footer;