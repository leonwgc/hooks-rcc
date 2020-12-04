import React, { useEffect, useState, useRef } from 'react';
import { Input, Cell, Button, Toast, Popup } from 'zarm';
import useSignature from '~/hooks/useSignature';
import './PortraitSignature.less';

// 手写签名 横屏例子

const PortraitSignature = () => {
  const canvas = useRef();

  const { download, clear } = useSignature(canvas, { useLandscape: false });

  return (
    <div className="portrait-signature-pad">
      <div className="wrapper">
        <canvas ref={canvas}></canvas>
      </div>
      <div className="footer">
        <Button onClick={clear}>清空</Button>
        <Button onClick={() => download('test.png')}>保存</Button>
      </div>
    </div>
  );
};

export default PortraitSignature;
