import React, { useRef, useState } from 'react';
import PortraitSignature from '../signature/PortraitSignature';
import { Icon, TabBar, Cell, Button } from 'zarm';
import LandscapeSignature from '../signature/LandscapeSignature';

export default function Sig() {
  const [isLandscape, setisLandscape] = useState(false);
  const [sigData, setSigData] = useState(null);
  return (
    <div>
      <Button
        onClick={() => {
          setisLandscape((l) => !l);
        }}
      >
        {isLandscape ? 'land' : 'port'}
      </Button>
      {isLandscape ? <LandscapeSignature /> : <PortraitSignature />}
    </div>
  );
}
