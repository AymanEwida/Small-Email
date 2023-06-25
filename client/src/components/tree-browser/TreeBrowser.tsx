import React, { useState } from 'react';

import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';

import './tree-browser.css';

type Tree = {
  name : string;
  childern ?: Tree[]
}

interface TreeBrowserProps {
  tree: {
    name : string,
    childern ?: Tree[],
  },
  depth : number,
}

const TreeBrowser: React.FC<TreeBrowserProps> = ({ tree, depth }) => {

  const [isShow, setIsShow] = useState(false);

  function handleShow (): void {
    setIsShow(prevIsShow => !prevIsShow);
  }

  return (
    <div>
      {tree?.childern ? (
        <div 
         className='flex gap-1 items-center hover:bg-gray-700 px-1 rounded-md cursor-pointer'
         onClick={handleShow}
        >
          <span className='text-sm'>
            {isShow ? <AiOutlineDown /> :<AiOutlineRight />}
          </span>
          <p className='text-gray-200'>
            {tree.name}
          </p>
        </div>
      ) : (
        <p className='text-gray-200 hover:bg-gray-700 px-1 rounded-md cursor-pointer'>
          {tree.name}
        </p>
      )}
      {isShow ? (
        <div
         style={{ paddingLeft: `${depth*10}px` }}
        >
          {tree?.childern ? (
            tree?.childern.map((file, index) => (
                <TreeBrowser
                 key={index}
                 tree={file}
                 depth={depth+1}
                />
            ))
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default TreeBrowser;