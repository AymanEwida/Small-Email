import React, { useState, useEffect, useRef } from 'react';

import './workspace-sidebar.css';

const WorkspaceSidebar: React.FC = () => {

  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);

  const sidebarRef = useRef<any>(null);

  function startResizing (): void {
    setIsResizing(true);
  }

  function stopResizing (): void {
    setIsResizing(false);
  }

  function resize (mouseMoveEvent: MouseEvent): void {
    if (isResizing) {
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
     className='absolute top-0 left-0 h-full bg-black flex-grow-0 flex-shrink-0 border-style flex flex-row z-index justify-between'
     ref={sidebarRef}
     onMouseDown={(event) => event.preventDefault()}
    >
      <p className='p-2'>
        Hello to rsizeable sidebar
      </p>
      <span 
       className='flex-grow-0 flex-shrink-0 flex-basis cursor-col-resize resize-x hover:w-1 hover:bg-[#c1c3c5b4] float-left'
       onMouseDown={startResizing} 
      />
    </aside>
  )
}

export default WorkspaceSidebar;