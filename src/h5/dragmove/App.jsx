import React, { useEffect, useRef } from 'react';
import dragmove from './dragmove';
import './App.less';

//g 生成年终账单

const App = () => {
  const boundaryRef = useRef();
  useEffect(() => {
    dragmove(document.querySelector('#c1'), boundaryRef.current);
  }, []);

  return (
    <div>
      <div className="boundary" ref={boundaryRef}></div>
      <div id="c1" data-drag-boundary></div>
    </div>
  );
};

export default App;
