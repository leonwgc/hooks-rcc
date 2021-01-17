import React, { useEffect } from 'react';
import { Canvas } from '@antv/g-canvas';


//g 生成年终账单

const App = () => {

  useEffect(() => {
    const canvas = new Canvas({
      container: 'c1',
      width: 375,
      height: 667,
    });

    const group = canvas.addGroup();

    group.addShape('image', {
      attrs: {
        x: 0,
        y: 0,
        width: 375,
        height: 667,
        img: 'https://image.zuifuli.com/17/20201227/5cfecef56f185504f91ac822af66d72a.png',
      },
    });

    group.addShape('text', {
      attrs: {
        x: 187.5,
        y: 566.9499999999999,
        fontFamily: 'Arial',
        text: '张晓明 | 2021 辛丑年',
        fontSize: 14,
        fill: '#957718',
        textAlign: 'center',
      },
    });

    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 577,
        width: 375,
        height: 90,
        fill: '#fff',
        stroke: '#fff',
        lineWidth: 0,
        radius: 0,
      },
    });

    group.addShape('image', {
      attrs: {
        x: 55,
        y: 592,
        width: 60,
        height: 60,
        img: 'https://h5.zuifuli.com/images/qrcode.c2d1b8.png',
      },
    });

    group.addShape('text', {
      attrs: {
        x: 125,
        y: 627,
        fontFamily: 'PingFang SC',
        text: '查看我的众安年度福利账单',
        fontSize: 18,
        fill: '#999',
        textAlign: 'left',
      },
    });
  }, []);

  return <div id="c1"></div>;
};

export default App;
