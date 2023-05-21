import React from 'react';

import TooltipComponent from '../tooltip-component/TooltipComponent';

import { Void } from '../../types/types';

import './icon.css';

interface IconProps {
    title : string,
    iconPosition : string,
    color : string,
    bgColor : string,
    textSize ?: string,
    animation ?: string,
    icon : React.ReactElement,
    customFunc ?: Void
}

const Icon: React.FC<IconProps> = ({ title, iconPosition, color, bgColor, textSize, animation, icon, customFunc }) => {
  return (
    <TooltipComponent
     message={title}
     direction={iconPosition}
    >
        <button
         type='button'
         style={{ color }}
         className={`text-${textSize} hover:${bgColor} hover:rounded-full p-2 ${animation}`}
         onClick={customFunc}
        >
            {icon}
        </button>
    </TooltipComponent>
  )
}

export default Icon;