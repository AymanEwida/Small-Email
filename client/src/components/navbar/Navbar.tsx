import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';

import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatDeleteLine } from 'react-icons/ri';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import TooltipComponent from '../tooltip-component/TooltipComponent';

import noAvater from '../../assests/noAvatar.png';

import { NavbarContext } from '../../context/navbar-context/NavbarContext';
import { NavbarTypes } from '../../context/navbar-context/NavbarReducer';

import {
  InputElement,
  EventInputElement,
  FormEvent
} from '../../types/types';

import './navbar.css';

const Navbar: React.FC = () => {

  const {
    state,
    navbarDispatch
  } = useContext(NavbarContext);

  const [searchValue, setSearchValue] = useState('');
  const [searchTouched, setSearchTouched] = useState(false);

  const search = useRef<InputElement>(null);

  function handleSidebar (): void {
    if (state.isMenu) {
      navbarDispatch({ type: NavbarTypes.CloseMenu });
    }else {
      navbarDispatch({ type: NavbarTypes.OpenMenu });
    }
  }

  function handleProfile (): void {
    if (state.isProfile) {
      navbarDispatch({ type: NavbarTypes.CloseProfile });
    }else {
      navbarDispatch({ type: NavbarTypes.OpenProfile });
    }
  }

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

  console.log({ profile: state.isProfile });

  return (
    <nav className='w-full fixed top-0 left-0 bg-black flex justify-between items-center py-2 px-3 drop-shadow-lg z-index'>
      <div className='flex gap-3 items-center'>
        <TooltipComponent
         message='Menu'
         direction='bottom'
        >
          <button
           type='button' 
           className='text-xl text-blue-400 hover:bg-gray-700 hover:rounded-full p-2'
           onClick={handleSidebar}
          >
            <RxHamburgerMenu />
          </button>
        </TooltipComponent>
        <Link to='/'>
          <span className='text-xl'>
            Small Email
          </span>
        </Link>
      </div>
      <form 
       className={`w-400 lg:w-800 flex items-center rounded-md ${searchTouched || searchValue !== '' ? 'bg-white' : 'bg-gray-600'} transition ease-out duration-200 text-black cursor-pointer drop-shadow-md`}
       onSubmit={handleSubmitSearch}
      >
        {searchValue !== '' ? (
          <TooltipComponent
           message='Clear Search'
           direction='bottom'
          >
            <button
            type='button'
            className='text-xl p-2 m-1 hover:bg-gray-300 hover:rounded-full'
            onClick={setSearchValueToEmpty}
            >
              <RiChatDeleteLine />
            </button>
          </TooltipComponent>
        ) : null}
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
        <TooltipComponent
         message='Search'
         direction='bottom'
        >
          <button
           type='button' 
           className={`text-xl p-2 m-1 ${searchTouched || searchValue !== '' ? 'hover:bg-gray-300' : 'hover:bg-gray-400 text-white'} hover:rounded-full`}
           onClick={() => search.current?.focus()}
          >
            <AiOutlineSearch />
          </button>
        </TooltipComponent>
      </form>
      <TooltipComponent
       message='Profile'
       direction='bottom'
      >
        <div 
        className='flex gap-3 items-center cursor-pointer hover:bg-gray-700 hover:rounded-md p-2 h-10'
        onClick={handleProfile}
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
      </TooltipComponent>
      {state.isProfile ? (
        <div className=' absolute top-16 right-3 bg-blue-700 p-5 w-72 rounded-lg z-index'>
          <TooltipComponent
           message='Close'
           direction='bottom'
          >
            <button
             type='button' 
             className='text-xl text-white hover:bg-gray-400 hover:rounded-full p-2'
             onClick={() => navbarDispatch({ type: NavbarTypes.CloseProfile })}
            >
              <IoMdCloseCircleOutline />
            </button>
          </TooltipComponent>
          <p>
            Profile
          </p>
        </div>
      ): null}
    </nav>
  )
}

export default Navbar;