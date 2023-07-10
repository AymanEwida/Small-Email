import React, { useState, useContext } from 'react';

import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';

import { fileContentContext } from '../../context/file-content-context/fileContentContext';
import { FileContentTypes } from '../../context/file-content-context/fileContentReducer';

import { TreeStructure } from '../../types/types';

import './tree-browser.css';

interface TreeBrowserProps {
  tree: TreeStructure,
  depth : number,
}

const TreeBrowser: React.FC<TreeBrowserProps> = ({ tree, depth }) => {

  const {
    fileContentDispatch
  } = useContext(fileContentContext);

  const [isShow, setIsShow] = useState(false);

  function handleShow (): void {
    setIsShow(prevIsShow => !prevIsShow);
  }

  async function getFileContent (file: File | void) {
    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      fileContentDispatch({ type: FileContentTypes.StoreFileContent, payload: content });
    } catch (error) {
      console.log(error);
    }
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
        <p 
         className='text-gray-200 hover:bg-gray-700 px-1 rounded-md cursor-pointer'
         onClick={() => getFileContent(tree.entry)}
        >
          {tree.entry?.name}
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