import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Popup.less';
import { Transition } from 'react-transition-group';

export default function Popup({
  children,
  visible,
  width = '100%',
  top = 0, // for center
  showMask = true,
  onMaskClick = null,
  direction = 'bottom',
  duration = 120,
}) {
  const wrapperRef = useRef(null);
  const popupRef = useRef(null);
  const didMount = useRef(false);
  const maskRef = useRef(null);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }
  }, []);

  const clickMask = (e) => {
    if (e.target === e.currentTarget) {
      onMaskClick();
    }
  };

  const popupStyle = {
    width,
    transition: !didMount.current
      ? null
      : `${direction === 'center' ? 'all' : 'transform'} ${duration}ms ease-in-out`,
  };

  const maskStyle = {
    transition: `all ${duration}ms ease-in-out`,
  };

  return ReactDOM.createPortal(
    <div className={`fe-popup-wrapper fe-popup-wrapper-${direction}`} ref={wrapperRef}>
      <Transition in={visible} timeout={duration} mountOnEnter={false}>
        {(status) => (
          <>
            <div
              ref={maskRef}
              style={maskStyle}
              className={`${visible ? 'mask in' : 'mask exited'}`}
              onClick={clickMask}
            ></div>
            <div
              ref={popupRef}
              style={popupStyle}
              className={`fe-popup fe-popup-${direction} ${direction + '_' + status}`}
            >
              {children}
            </div>
          </>
        )}
      </Transition>
    </div>,
    document.body
  );
}
