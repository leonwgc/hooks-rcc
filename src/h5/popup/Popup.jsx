import React, { useEffect, useRef, useState } from 'react';
import './Popup.less';
import { Transition } from 'react-transition-group';

export default function Popup({ children, visible }) {
  const wrapperRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (visible) {
      wrapperRef.current.classList.remove('hidden');
    }

    const onPopupTransitionEnd = () => {
      if (!visible) {
        wrapperRef.current.classList.add('hidden');
      }
    };

    popupRef.current.addEventListener('transitionend', onPopupTransitionEnd);
    popupRef.current.addEventListener('webkitTransitionEnd', onPopupTransitionEnd);
    return () => {
      popupRef.current.removeEventListener('transitionend', onPopupTransitionEnd);
      popupRef.current.removeEventListener('webkitTransitionEnd', onPopupTransitionEnd);
    };
  }, [visible]);

  return (
    <div className={`fe-popup-wrapper`} ref={wrapperRef}>
      <Transition in={visible}>
        {(status) => (
          <div ref={popupRef} className={`fe-popup ${status}`}>
            {children}
          </div>
        )}
      </Transition>
    </div>
  );
}
