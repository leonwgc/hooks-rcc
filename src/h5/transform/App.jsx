import React, { useEffect, useRef } from 'react';
import snow from './images/snow.png';
import './App.less';

const App = () => {
  // useEffect(() => {
  //   document.body.style.background = '#000';
  // }, []);

  return (
    <div className="transform">
      {/* <div className="snow-list">
        <img src={snow} />
        <img src={snow} />
      </div> */}

      <div className="qian"></div>
    </div>
  );
};

export default App;
