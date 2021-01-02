import React, { useState, useRef, useEffect, useReducer } from 'react';
import BScroll from 'better-scroll';
import './Picker.less';
import usePrevious from '~/hooks/usePrevious';
import { useSetState } from 'ahooks';

const noop = () => {};

export default function Picker({
  value = '',
  items = [],
  onChange = noop,
  onOk = noop,
  onCancel = noop,
  title = '请选择',
  okLabel = '确定',
  cancelLabel = '取消',
}) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [arr] = useState(() => {
    let l = 0;
    let t = items;
    while (Array.isArray(t)) {
      l++;
      t = t[0].children;
    }

    let a = new Array(l).fill([]);
    a[0] = items;
    return a;
  });

  const arrRef = useRef(arr);
  const indexRef = useRef([]);
  const wrapperRef = useRef();
  const weels = useRef([]);

  const renderWheels = () => {
    return arrRef.current.map((items, index) => (
      <div className="wheel" key={index}>
        <ul className="wheel-scroll">
          {items.map((item, idx) => (
            <li className={`wheel-item ${item.disabled ? 'wheel-disabled-item' : ''}`} key={idx}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  useEffect(() => {
    [...wrapperRef.current.children].map((el, idx) => {
      weels.current[idx] = new BScroll(el, {
        wheel: {
          selectedIndex: indexRef.current[idx] || 0,
          wheelWrapperClass: 'wheel-scroll',
          wheelItemClass: 'wheel-item',
          wheelDisabledItemClass: 'wheel-disabled-item',
        },
        useTransition: true,
        probeType: 3,
      });

      weels.current[idx].on('scrollEnd', () => {
        let selectedIndex = weels.current[idx].getSelectedIndex();
        indexRef.current[idx] = selectedIndex;

        let next = idx + 1;
        while (next < arr.length) {
          indexRef.current[next] = 0;
          next++;
        }

        next = idx + 1;

        let _idx = idx;
        let _sindex = selectedIndex;

        while (next < arrRef.current.length) {
          if (arrRef.current[_idx][_sindex]) {
            arrRef.current[next] = arrRef.current[_idx][_sindex].children;
          }

          weels.current[next].wheelTo(0);
          weels.current[next].refresh();
          next++;
          _idx++;
          _sindex = 0;
        }
        forceUpdate();
        requestAnimationFrame(() => {
          weels.current.map((w) => w.refresh());
        });
      });
    });

    requestAnimationFrame(() => {
      weels.current.map((w) => w.refresh());
    });
  }, []);

  return (
    <div className="container">
      <div className="picker">
        <div className="picker-panel">
          <div className="picker-choose border-bottom-1px">
            <span className="cancel" onClick={onCancel}>
              {cancelLabel}
            </span>
            <span
              className="confirm"
              onClick={() => {
                let data = arrRef.current.map((a, idx) => a[weels.current[idx].getSelectedIndex()]);
                console.log(data);
              }}
            >
              {okLabel}
            </span>
            <h1 className="picker-title">{title}</h1>
          </div>
          <div className="picker-content">
            <div className="mask-top"></div>
            <div className="mask-bottom"></div>
            <div className="wheel-wrapper" ref={wrapperRef}>
              {renderWheels()}
            </div>
          </div>
          <div className="picker-footer"></div>
        </div>
      </div>
    </div>
  );
}
