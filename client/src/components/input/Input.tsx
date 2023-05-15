import React from 'react'

import { EventInputElement } from '../../types/types';

import './input.css';

interface InputProps {
  id : string,
  label : string,
  type : string,
  value : string,
  customFunc : (event : EventInputElement) => void
}

const Input: React.FC<InputProps> = ({ id, label, type, value, customFunc }) => {
  return (
    <div className='relative'>
      <input
       type={type}
       id={id}
       className='block rounded-md px-6 pt-6 pb-1 w-full text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
       placeholder=' '
       value={value}
       onChange={customFunc} 
      />
      <label 
       htmlFor={id}
       className='absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
      >
        {label}
      </label>
    </div>
  )
}

export default Input;