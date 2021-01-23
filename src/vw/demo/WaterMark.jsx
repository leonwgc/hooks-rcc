import React, { useEffect, useRef, useState } from 'react';
import './WaterMark.less';

const text = '你好，世界 ，hello,world';

export default function WaterMark() {
  useEffect(() => {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var tm = context.measureText(text);
    canvas.width = tm.width * 2;
    canvas.height = tm.width * 2;

    context.rotate((Math.PI / 6) * -1);
    context.translate(-canvas.width * 0.2, -canvas.height * 0.4);
    context.font = '16px Microsoft JhengHei';
    //cans.fillStyle = "rgba(17, 17, 17, 0.50)";
    context.fillStyle = '#000';
    context.textAlign = 'left';
    context.textBaseline = 'Bottom';
    context.fillText(text, 0, canvas.height);

    document.querySelector('.water-mark').style.backgroundImage =
      'url(' + canvas.toDataURL('image/png') + ')';
  }, []);

  return (
    <div>
      hello,world
      <div className="rect">xxx</div>
      <div className="water-mark"></div>
    </div>
  );
}
