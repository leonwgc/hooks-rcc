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
  duration = 200,
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

  useEffect(() => {
    if (direction == 'center') {
      const onTransitionEnd = () => {
        maskRef.current.classList[visible ? 'add' : 'remove']('mask');
      };
      popupRef.current.addEventListener('transitionend', onTransitionEnd);

      return () => popupRef.current.removeEventListener('transitionend', onTransitionEnd);
    }
  }, [visible, direction]);

  const isFirstRenderAndNotVisible = !visible && !didMount.current;

  const clickMask = (e) => {
    if (e.target === maskRef.current) {
      onMaskClick();
    }
  };

  const popupStyle = {
    width,
    transition: isFirstRenderAndNotVisible
      ? null
      : `${direction === 'center' ? 'all' : 'transform'} ${duration}ms ease-in-out`,
  };

  if (direction === 'center') {
    popupStyle.top = top || '10vh';
  }

  const maskStyle = {
    backgroundColor: showMask ? 'rgba(0, 0, 0, 0.35)' : 'transparent',
    opacity: isFirstRenderAndNotVisible ? 0 : 1,
  };

  return ReactDOM.createPortal(
    <div className={`fe-popup-wrapper fe-popup-wrapper-${direction}`} ref={wrapperRef}>
      <Transition in={visible} timeout={duration} mountOnEnter={false}>
        {(status) => (
          <div
            ref={maskRef}
            style={maskStyle}
            className={`mask mask_${status}`}
            onClick={clickMask}
          >
            <div
              ref={popupRef}
              style={popupStyle}
              className={`fe-popup fe-popup-${direction} ${direction + '_' + status}`}
            >
              {children}
            </div>
          </div>
        )}
      </Transition>
    </div>,
    document.body
  );
}
