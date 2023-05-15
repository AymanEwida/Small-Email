import React from 'react';

import { Void } from '../../types/types';

import './button.css';

interface ButtonProps {
  text : string,
  type : "button" | "submit" | "reset",
  borderRadius ?: string,
  bgColor : string,
  width ?: string,
  paddingSize : string,
  textSize : string,
  color : string,
  customFunc ?: Void,
}

const Button: React.FC<ButtonProps> = ({ text, type, borderRadius, bgColor, width, paddingSize, textSize, color, customFunc }) => {
  return (
    <button
     type={type}
     style={{ backgroundColor: bgColor, borderRadius, color, width }}
     className={`p-${paddingSize} text-${textSize} hover:drop-shadow-xl`}
     onClick={customFunc}
    >
      {text}
    </button>
  )
}

export default Button;