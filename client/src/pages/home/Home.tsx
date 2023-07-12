import React from 'react';

import { Link } from 'react-router-dom';

import {
  HomePageNavbar,
  Button,
  ImageSlider
} from '../../components';

import about from '../../assests/about.webp';

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
    </div>
  )
}

export default Home;