import React, { useRef } from 'react';

import useSignature from '~/hooks/useSignature';
import { Button } from 'zarm';
import './Sig.less';

export default function Sig() {
  const canvas = useRef();

  const { download, pad, undo, setPenColor, clear } = useSignature(canvas);
  return (
    <div>
      <div className="sig">
        <div className="wrapper">
          <canvas className="pad" ref={canvas}></canvas>
        </div>
      </div>
      <div>
        <Button onClick={() => download('hello.png')}>download</Button>
        <Button onClick={clear}>clear</Button>
        <Button onClick={undo}>undo</Button>
        <Button onClick={() => setPenColor('red')}>set pen color</Button>
      </div>
    </div>
  );
}
