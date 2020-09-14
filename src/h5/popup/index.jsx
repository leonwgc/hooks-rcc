import React, { useState } from 'react';
import Popup from './Popup';
import { Cell, Button } from 'zarm';
import './index.less';

export default function PopupIndex() {
  const [visible, setVisible] = useState({
    left: false,
    bottom: false,
  });

  const show = (direction, v) => {
    setVisible({ ...visible, [direction]: v });
  };

  return (
    <div>
      <Cell hasArrow title="bottom" onClick={() => show('bottom', true)}></Cell>
      <Cell hasArrow title="left" onClick={() => show('left', true)}></Cell>
      <Cell hasArrow title="top" onClick={() => show('top', true)}></Cell>
      <Cell hasArrow title="right" onClick={() => show('right', true)}></Cell>
      <Cell hasArrow title="center" onClick={() => show('center', true)}></Cell>

      <Popup visible={visible.bottom} onMaskClick={() => show('bottom', false)}>
        <div className="pop-up-bottom-demo">
          <Button onClick={() => show('bottom', false)}>close</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.left}
        width="30vw"
        direction="left"
        onMaskClick={() => show('left', false)}
      >
        <div className="pop-up-left-demo">
          <Button onClick={() => show('left', false)}>close</Button>
        </div>
      </Popup>

      <Popup visible={visible.top} direction="top" onMaskClick={() => show('top', false)}>
        <div className="pop-up-top-demo">
          <Button onClick={() => show('top', false)}>close</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.right}
        width="30vw"
        direction="right"
        onMaskClick={() => show('right', false)}
      >
        <div className="pop-up-right-demo">
          <Button onClick={() => show('right', false)}>close</Button>
        </div>
      </Popup>

      <Popup
        visible={visible.center}
        showMask={true}
        width="50vw"
        direction="center"
        onMaskClick={() => show('center', false)}
      >
        <div className="pop-up-center-demo">
          <Button onClick={() => show('center', false)}>close</Button>
        </div>
      </Popup>
    </div>
  );
}
