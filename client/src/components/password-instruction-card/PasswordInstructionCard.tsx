import React from 'react';

import './password-instruction-card.css';

interface PasswordInstructionCardProps {
  children : React.ReactNode,
  desc : string,
  isPass : () => boolean,
}

const PasswordInstructionCard: React.FC<PasswordInstructionCardProps> = ({ children, desc, isPass }) => {
  return (
    <div className={`bg-main-dark-bg py-3 px-5 rounded-md ${isPass() ? 'border-1 border-solid border-green-400' : ''}`}>
      <div className='flex items-center gap-3 text-5xl justify-center italic text-gray-400'>
        {children}
      </div>
      <p className='mt-2 text-gray-300 text-sm w-28 lg:w-44'>
        {desc}
      </p>
    </div>
  )
}

export default PasswordInstructionCard;