import React, { useEffect } from 'react';
import { Canvas } from '@antv/g-canvas';

const App = () => {
  useEffect(() => {
    const canvas = new Canvas({
      container: 'c1',
      width: 600,
      height: 500,
    });

    const circle = canvas.addShape('circle', {
      attrs: {
        x: 200,
        y: 200,
        r: 100,
        fill: '#1890FF',
        stroke: '#F04864',
        lineWidth: 4,
        cursor: 'pointer',
      },
    });

    circle.on('mouseenter', () => {
      circle.attr('fill', '#2FC25B');
    });

    circle.on('mouseleave', () => {
      circle.attr('fill', '#1890FF');
    });

    circle.on('click', () => {
      alert('clicked');
    });
  }, []);

  return <div id="c1"></div>;
};

export default App;
