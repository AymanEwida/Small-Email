import React, { useState, useRef, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatDeleteLine } from 'react-icons/ri';
import { BsChevronDown } from 'react-icons/bs';

import TooltipComponent from '../tooltip-component/TooltipComponent';
import Icon from '../icon/Icon';

import noAvater from '../../assests/noAvatar.png';

import { NavbarContext } from '../../context/navbar-context/NavbarContext';
import { NavbarTypes } from '../../context/navbar-context/NavbarReducer';
import Profile from '../profile/Profile';

import {
  Event,
  InputElement,
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

  const history = useNavigate();

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

  function handleSearchValue (event: Event<InputElement>): void {
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
    
    if (searchValue) { 
      const location = document.location.href.split('/').at(-1);

      if (location === 'inbox' || location === 'sent') {
        const search = searchValue.split(' ').join('+');
        history(`/${location}?searchValue=${search}`);
      }
    }
  }

  return (
    <nav className='w-full fixed top-0 left-0 bg-black flex justify-between items-center py-2 px-3 drop-shadow-lg z-index'>
      <div className='flex gap-3 items-center'>
        <Icon
         title='Menu'
         iconPosition='bottom'
         color='rgb(96 165 250)'
         bgColor='bg-gray-700'
         textSize='xl'
         icon={<RxHamburgerMenu />}
         customFunc={handleSidebar} 
        />
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
          <span className='ml-1'>
            <Icon
             title='Clear Search'
             iconPosition='bottom'
             color='black'
             bgColor='bg-gray-300'
             textSize='xl'
             icon={<RiChatDeleteLine />}
             customFunc={setSearchValueToEmpty} 
            />
          </span>
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
        <span className='m-1'>
          <Icon
           title='Search'
           iconPosition='bottom'
           color={searchTouched || searchValue !== '' ? 'black' : 'white'}
           bgColor={searchTouched || searchValue !== '' ? 'bg-gray-300' : 'bg-gray-400'}
           textSize='xl'
           icon={<AiOutlineSearch />}
           customFunc={() => search.current?.focus()} 
          />
        </span>
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
            <span className='font-bold text-blue-400 hover:text-green-400 hover:drop-shadow-md'>
              {Cookies.get('username')}
            </span>
          </p>
          <span className={`text-sm ${state.isProfile ? 'rotate-180' : ''} transform duration-200`}>
            <BsChevronDown />
          </span>
        </div>
      </TooltipComponent>
      {state.isProfile ? (
        <Profile />
      ): null}
    </nav>
  )
}

export default Navbar;