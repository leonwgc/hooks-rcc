import React, { useEffect } from 'react';
import dragmove from './lib';
import './App.less';

//g 生成年终账单

const App = () => {
  useEffect(() => {
    const snapThreshold = 50;
    function onStart(el, x, y) {
      // On drag start, remove the fixed bottom style to prevent the bottom
      // from sticking on the screen.
      el.style.top = el.offsetTop + 'px';
      el.style.bottom = 'auto';
    }

    function onEnd(el, x, y) {
      console.log('end');
      // Automatically snap to corners.
      if (window.innerHeight - (el.offsetTop + el.offsetHeight) < snapThreshold) {
        el.style.top = 'auto';
        el.style.bottom = '0px';
      }
      if (window.innerWidth - (el.offsetLeft + el.offsetWidth) < snapThreshold) {
        el.style.left = 'auto';
        el.style.right = '0px';
      }
      if (el.offsetTop < snapThreshold) {
        el.style.top = '0px';
      }
      if (el.offsetLeft < snapThreshold) {
        el.style.left = '0px';
      }
    }

    dragmove(document.querySelector('#c1'), document.querySelector('#c1'), onStart, onEnd);
  }, []);

  return <div id="c1"></div>;
};

export default App;