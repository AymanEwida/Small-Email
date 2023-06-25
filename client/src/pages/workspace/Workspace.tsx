import React from 'react'

import {
  WorkspaceSidebar
} from '../../components';

import './workspace.css';

type Tree = {
  name : string;
  content ?: string;
  childern ?: Tree[];
}

const files: { childern: Tree[] } = {
  childern: [
    {
      name: 'cat.js',
      content: 'console.log("Hello, Cats!");'
    },
    {
      name: 'dog',
      childern: [
        {
          name: 'dog.js',
          content: 'console.log("Hello, Dogs!");'
        },
        {
          name: 'resky',
          childern: [
            {
              name: 'resky.py',
              content: 'print("Hello, Resky!")'
            }
          ]
        }
      ]
    },
    {
      name: 'test',
      childern: [
        {
          name: 'test.css',
          content: ''
        },
        {
          name: 'Test.tsx',
          content: `
           import React form 'react';
           
           import './test.css';

           const Test: React.FC = () => {
              return (
                <div>
                  Test
                </div>
              );
           }

           export default Test;
          `
        }
      ]
    }
  ]
}

const Workspace: React.FC = () => {
  return (
    <div className='h-full w-full flex flex-row'>
      <WorkspaceSidebar 
       files={files.childern}
      />
      <div className='mx-5 my-2'>
        <textarea
         cols={250}  
         style={{ resize: 'none' }}
         className='text-white bg-transparent w-full outline-none h-full'
        />
      </div>
    </div>
  )
}

export default Workspace;