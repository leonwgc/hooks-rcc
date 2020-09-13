import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Popup.less';
import { Transition } from 'react-transition-group';

export default function Popup({
  children,
  visible,
  width = '100%',
  showMask = true,
  onMaskClick = null,
  direction = 'bottom',
  duration = 200,
}) {
  const wrapperRef = useRef(null);
  const popupRef = useRef(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  }, []);

  const isFirstRenderAndNotVisible = !visible && !didMount.current;

  return ReactDOM.createPortal(
    <Transition in={visible} timeout={duration} mountOnEnter={false}>
      {(status) => (
        <div className={`fe-popup-wrapper fe-popup-wrapper-${direction} `} ref={wrapperRef}>
          {showMask && visible && <div onClick={onMaskClick} className={`mask ${status}`}></div>}
          <div
            ref={popupRef}
            style={{
              width,
              transition: isFirstRenderAndNotVisible ? null : `transform ${duration}ms ease-in-out`,
            }}
            className={`fe-popup fe-popup-${direction} ${direction + '_' + status}`}
          >
            {children}
          </div>
        </div>
      )}
    </Transition>,
    document.body
  );
}
