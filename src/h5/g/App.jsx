import React, { useEffect } from 'react';
import { Canvas } from '@antv/g-canvas';

const App = () => {
  useEffect(() => {
    const canvas = new Canvas({
      container: 'c1',
      width: 200,
      height: 500,
    });

    canvas.addShape('text', {
      attrs: {
        x: 0,
        y: 100,
        fontWeight: 10,
        textAlign: 'left',
        text: '你好，世界23333444',
        fontFamily: 'PingFang SC',
        stroke: 'black',
      },
    });
  }, []);

  return <div id="c1"></div>;
};

export default App;
