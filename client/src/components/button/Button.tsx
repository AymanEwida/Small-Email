import React from 'react';

import { Void } from '../../types/types';

import './button.css';

interface ButtonProps {
  text : string | React.ReactNode,
  type : "button" | "submit" | "reset",
  borderRadius ?: string,
  bgColor : string,
  width ?: string,
  paddingSize : string,
  textSize : string,
  color : string,
  special ?: string,
  customFunc ?: Void,
}

const Button: React.FC<ButtonProps> = ({ text, type, borderRadius, bgColor, width, paddingSize, textSize, color, special, customFunc }) => {
  return (
    <button
     type={type}
     style={{ backgroundColor: bgColor, borderRadius, color, width }}
     className={`p-${paddingSize} text-${textSize} hover:drop-shadow-xl ${special}`}
     onClick={customFunc}
    >
      {text}
    </button>
  )
}

export default Button;