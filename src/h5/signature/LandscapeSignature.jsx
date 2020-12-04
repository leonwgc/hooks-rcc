import React, { useEffect, useState, useRef } from 'react';
import { Input, Cell, Button, Toast, Popup } from 'zarm';
import useSignature from '~/hooks/useSignature';
import './LandscapeSignature.less';

// 手写签名 横屏例子

const LandscapeSignature = () => {
  const canvas = useRef();

  const { download, clear } = useSignature(canvas);

  return (
    <div className="landscape-signature-pad">
      <canvas ref={canvas}></canvas>
      <div className="footer">
        <Button onClick={clear}>清空</Button>
        <Button onClick={() => download('test.png')}>保存</Button>
      </div>
    </div>
  );
};

export default LandscapeSignature;
