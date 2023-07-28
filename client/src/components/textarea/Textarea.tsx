import React, { useState } from 'react';

import { Event, TextAreaElement } from '../../types/types';

import './textarea.css';

interface TextareaProps {
  id : string,
  label : string,
  value : string,
  name ?: string,
  isRequired ?: boolean,
  customFunc : (event : Event<TextAreaElement>) => void,
}

const Textarea: React.FC<TextareaProps> = ({ id, label, value, name, isRequired, customFunc }) => {

  const [isTouched, setIsTouched] = useState(false);

  function handleFocus (): void {
    setIsTouched(true);
  }

  function handleFocusOut (): void {
    setIsTouched(false);
  }

  return (
    <div className='relative'>
      <textarea
       id={id}
       cols={30}
       rows={10}
       className={`block rounded-md px-6 pt-6 pb-1 w-full ${isTouched || value.length > 0 ? 'text-black bg-white' : 'text-white bg-neutral-700'} transform ease-out duration-150 appearance-none focus:outline-none focus:ring-0 peer`}
       placeholder=' '
       value={value}
       name={name}
       required={isRequired}
       onChange={customFunc}
       onFocus={handleFocus}
       onBlur={handleFocusOut} 
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

export default Textarea;