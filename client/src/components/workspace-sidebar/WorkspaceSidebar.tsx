import React, { useState, useEffect, useRef } from 'react';

import FileNavbar from '../file-navbar/FileNavbar';
import TreeBrowser from '../tree-browser/TreeBrowser';

import './workspace-sidebar.css';

type Tree = {
  name : string;
  content ?: string;
  childern ?: Tree[];
}

interface WorkspaceSidebarProps {
  files : Tree[],
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ files }) => {

  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);

  const sidebarRef = useRef<HTMLDivElement>(null);

  function startResizing (): void {
    setIsResizing(true);
  }

  function stopResizing (): void {
    setIsResizing(false);
  }

  function resize (mouseMoveEvent: MouseEvent): void {
    if (isResizing && sidebarRef.current) {
      setSidebarWidth(mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
  }, [resize, stopResizing]);

  return (
    <aside
     style={{ width: sidebarWidth, maxWidth: '250px', minWidth: '150px' }} 
     className='sticky top-0 left-0 h-full bg-black flex-grow-0 flex-shrink-0 border-style flex flex-row z-index justify-between'
     ref={sidebarRef}
     onMouseDown={(event) => event.preventDefault()}
    >
      <div className='relative w-full'>
        <FileNavbar />
        <div className='p-3'>
          {files.map((file, index) => (
            <TreeBrowser
             key={index}
             tree={file}
             depth={1}
            />
          ))}
        </div>
      </div>
      <span 
       className='flex-grow-0 flex-shrink-0 flex-basis cursor-col-resize resize-x hover:w-1 hover:bg-[#c1c3c5b4] float-left'
       onMouseDown={startResizing} 
      />
    </aside>
  )
}

export default WorkspaceSidebar;