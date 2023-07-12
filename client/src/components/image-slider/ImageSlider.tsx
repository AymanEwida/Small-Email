import React, { useState, useEffect } from 'react';

import presentation1 from '../../assests/presentation1.png';
import presentation2 from '../../assests/presentation2.png';
import presentation3 from '../../assests/presentation3.webp';

import { infos } from './infoData';

import './image-slider.css';

const ImageSlider: React.FC = () => {

  let interval: NodeJS.Timer;

  const [imagesSrcs] = useState<string[]>([presentation1, presentation2, presentation3])
  const [idx, setIdx] = useState(0);

  function setIdxToCorrect (): void {
    setIdx(prevIdx => prevIdx === imagesSrcs.length -1 ? 0 : prevIdx+1);
  }

  function getIdx (): ReturnType<typeof setInterval> {
    return setInterval(() => {
      setIdxToCorrect();
    }, 5000);
  }

  function setActiveInfo (): void {
    infos[idx].isHere = true

    if (idx === 0) {
      infos[imagesSrcs.length-1].isHere = false;
    } else {
      infos[idx-1].isHere = false;
    }
  }

  useEffect(() => {
    interval = getIdx();
    
    return () => {
      clearInterval(interval);
    }
  }, []);

  setActiveInfo();

  return (
    <div className='flex gap-8'>
      <div className='flex-1 overflow-hidden my-auto lg:my-0'>
        <img 
         className='bg-no-repeat object-contain'
         src={imagesSrcs[idx]} 
         alt="presentation" 
        />
      </div>
      <div className='flex-1 p-3'>
        <h1 className='text-2xl font-bold text-green-400'>
          Get more done with Small Email
        </h1>
        <div className='flex flex-col gap-10 mt-16 h-full'>
          {infos.map((info, index) => (
            <div key={index} className='flex items-center gap-4'>
              <span className='track'>
                <span className={`mover ${info.isHere ? 'height-100' : 'height-0'}`} />
              </span>
              <div>
                <h2 className={`text-md lg:text-xl ${info.isHere ? 'text-blue-500' : 'text-gray-600'}`}>
                  {info.title}
                </h2>
                <p className={`${info.isHere ? 'text-white' : 'text-gray-400'} mt-3`}>
                  {info.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider;