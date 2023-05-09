import React, { useState, useRef } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatDeleteLine } from 'react-icons/ri';

import noAvater from '../../assests/noAvatar.png';

import './navbar.css';

const Navbar: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');

  const search = useRef<HTMLInputElement>(null);

  function handleSearchValue (event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  function setSearchValueToEmpty (): void {
    setSearchValue('');
  }

  return (
    <nav className='w-full sticky top-0 bg-black flex justify-between items-center py-2 px-3 drop-shadow-lg z-index'>
      <div className='flex gap-3 items-center'>
        <button
         type='button' 
         className='text-xl text-blue-400 hover:bg-gray-700 hover:rounded-full p-2'
         onClick={() => console.log('open sidebar!!')}
        >
          <RxHamburgerMenu />
        </button>
        <span className='text-xl'>
          Small Email
        </span>
      </div>
      <div className='w-400 lg:w-800 flex items-center rounded-md bg-white text-black overflow-hidden cursor-pointer drop-shadow-md'>
        {searchValue !== '' ? <button
         type='button'
         className='text-xl p-2 m-1 hover:bg-gray-300 hover:rounded-full'
         onClick={setSearchValueToEmpty}
        >
          <RiChatDeleteLine />
        </button> : null}
        <input 
         type="text"
         placeholder='Search for email'
         ref={search}
         value={searchValue}
         onChange={handleSearchValue}
         className='w-full p-1 px-2 bg-transparent outline-none peer' 
        />
        <button
         type='button' 
         className='text-xl p-2 m-1 hover:bg-gray-300 hover:rounded-full'
         onClick={() => search.current?.focus()}
        >
          <AiOutlineSearch />
        </button>
      </div>
      <div 
       className='flex gap-3 items-center cursor-pointer hover:bg-gray-700 hover:rounded-md p-2 h-10'
       onClick={() => console.log('open profile!')}
      >
        <img 
         src={noAvater}
         className='h-8 w-8 rounded-full object-cover' 
         alt="profile" 
        />
        <p className='text-md'>
          Hi, {' '}
          <span className='font-bold hover:text-green-400 hover:drop-shadow-md'>
            Jan Doe
          </span>
        </p>
      </div>
    </nav>
  )
}

export default Navbar;