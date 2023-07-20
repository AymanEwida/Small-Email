import React, { useState, useEffect } from 'react';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';

import './tefo.css';

interface TefoProps {
  isError : boolean,
  message : string
}

const Tefo: React.FC<TefoProps> = ({ isError, message }) => {

  let timeout: NodeJS.Timeout;

  const [isShow, setIsShow] = useState(true);

  function handleIsShow (): ReturnType<typeof setTimeout> {
    return setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }

  useEffect(() => {
    timeout = handleIsShow();

    return () => {
      clearInterval(timeout);
    }
  }, []);

  if (!isShow) {
    return (
      <div />
    );
  }

  return (
    <div className='absolute bottom-5 left-1/2 w-fit right-1/2 bg-neutral-700 flex gap-2 items-center p-3 rounded-xl'>
      <span className={`text-xl ${isError ? 'text-red-400' : 'text-green-400'}`}>
        {isError ? <GiCancel /> : <AiOutlineCheckCircle />}
      </span>
      <p className='text-gray-300 text-md'>
        {message}
      </p>
    </div>
  )
}

export default Tefo;