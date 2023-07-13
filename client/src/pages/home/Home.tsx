import React from 'react';

import { Link } from 'react-router-dom';

import { MdMail } from 'react-icons/md';

import {
  HomePageNavbar,
  Button,
  ImageSlider,
  Fetcher,
  Footer
} from '../../components';

import about from '../../assests/about.webp';
import final from '../../assests/final.webp';

import { fetchersData } from './data';

import './home.css';

const Home: React.FC = () => {
  return (
    <div className='pt-24'>
      <HomePageNavbar />
      <div className='width m-auto'>
        <div className='flex mb-20'>
          <div className='flex-1 p-4 lg:p-20'> 
            <h1 className='text-3xl font-extrabold text-green-400 w-60 lg:w-80'>
              Secure, smart, and easy to use email
            </h1>
            <p className='text-gray-400 w-80 my-3.5 lg:my-16'>
              Get more done with Small Email. Now integrated with our Chat, Workspace and more, all in one place.
            </p>
            <Link to='/register'>
              <Button
               type='button'
               bgColor='rgb(29 78 216)'
               text='Create New Account'
               paddingSize='2'
               textSize='md'
               color='white'
               borderRadius='5px' 
              />
            </Link>
          </div>
          <div className='flex-1 h-full'>
            <img
             className='bg-no-repeat object-cover'
             src={about} 
             alt="about" 
            />
          </div>
        </div>
        <ImageSlider />
      </div>
      <div className='bg-black w-full my-10 p-8 flex flex-row justify-center gap-28'>
        {fetchersData.map((fetcherData, index) => (
          <Fetcher
           key={index}
           icon={fetcherData.icon}
           title={fetcherData.title}
           desc={fetcherData.desc} 
          />
        ))}
      </div>
      <div className='grid place-items-center text-center'>
        <span className='text-4xl text-green-400'>
          <MdMail />
        </span>
        <h1 className='mb-5 mt-8 font-extrabold text-3xl w-80 text-blue-400'>
          Show everyone How do you do that
        </h1>
        <h2 className='text-gray-300 text-xl w-72 mb-8'>
          Getting started with a more advanced Small Email.
        </h2>
        <Link to='/register'>
          <Button
           type='button'
           bgColor='rgb(29 78 216)'
           text='Create New Account'
           paddingSize='2'
           textSize='md'
           color='white'
           borderRadius='5px' 
          />
        </Link>
        <img
         className='w-full object-contain' 
         src={final}
         alt="about" 
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home;