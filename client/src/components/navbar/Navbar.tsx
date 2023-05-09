import React, { useState, useRef } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatDeleteLine } from 'react-icons/ri';

import noAvater from '../../assests/noAvatar.png';

import {
  InputElement,
  EventInputElement,
  FormEvent
} from '../../types/types';

import './navbar.css';

const Navbar: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');
  const [searchTouched, setSearchTouched] = useState(false);

  const search = useRef<InputElement>(null);

  function handleSearchValue (event: EventInputElement): void {
    setSearchValue(event.target.value);
  }

  function setSearchValueToEmpty (): void {
    setSearchValue('');
  }

  function handleSearchFocus (): void {
    setSearchTouched(true);
  }

  function handleSearchFocusOut (): void {
    setSearchTouched(false);
  }

  function handleSubmitSearch (event: FormEvent): void {
    event.preventDefault();

    console.log('I submitted wow!!');
  }

  return (
    <nav className='w-full fixed top-0 bg-black flex justify-between items-center py-2 px-3 drop-shadow-lg z-index'>
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
      <form 
       className={`w-400 lg:w-800 flex items-center rounded-md ${searchTouched ? 'bg-white' : 'bg-gray-600'} transition ease-out duration-200 text-black overflow-hidden cursor-pointer drop-shadow-md`}
       onSubmit={handleSubmitSearch}
      >
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
         className='w-full p-1 px-2 bg-transparent outline-none'
         onFocus={handleSearchFocus}
         onBlur={handleSearchFocusOut} 
        />
        <button
         type='button' 
         className='text-xl p-2 m-1 hover:bg-gray-300 hover:rounded-full'
         onClick={() => search.current?.focus()}
        >
          <AiOutlineSearch />
        </button>
      </form>
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