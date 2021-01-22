import React, { useEffect, useRef, useState } from 'react';
import './Page1.less';

export default function Page1() {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      console.log({
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        which: e.which,
      });
    });
  }, []);

  return (
    <div className="page1">
      <div className="rect"></div>
    </div>
  );
}
