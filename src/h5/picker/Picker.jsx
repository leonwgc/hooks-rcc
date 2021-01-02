import React, { useState, useRef, useEffect, useReducer } from 'react';
import BScroll from 'better-scroll';
import './Picker.less';

const noop = () => {};

export default function Picker({
  value = [],
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

  const [initIndex] = useState(() => {
    let ar = [];

    // if (value.length > 0) {
    //   let i = 0;
    //   while (i + 1 < arr.length) {
    //     arrRef.current[i + 1] = arr[i].find((item) => (item.value = value[i])).chidren;
    //     i++;
    //   }
    // }

    return ar;
  });


  const indexRef = useRef(initIndex);
  const wrapperRef = useRef();
  const weels = useRef([]);
  const lastValue = useRef(value);

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

  const refreshAll = () => {
    weels.current.map((w) => w.refresh());
  };

  const getData = () => {
    if (arr[arr.length - 1]) {
      let data = arrRef.current
        .map((a, idx) => {
          const cIndex = weels.current[idx].getSelectedIndex();
          if (cIndex > -1) {
            return a[cIndex];
          } else {
            return a[0];
          }
        })
        .map((item) => ({ label: item.label, value: item.value }));

      return data;
    }
  };

  const onScrollEnd = (idx, isInit = false) => {
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
      next++;
      _idx++;
      _sindex = 0;
    }
    forceUpdate();
    refreshAll();

    if (typeof onChange === 'function' && !isInit) {
      const cValue = getData().map((i) => i.value);
      if (lastValue.current.join() !== cValue.join()) {
        lastValue.current = cValue;
        onChange(getData());
      }
    }
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

      weels.current[idx].on('scrollEnd', () => onScrollEnd(idx));
    });

    if (!value.length) {
      onScrollEnd(0, true);
    } else {
    }
  }, []);

  return (
    <div className="container">
      <div className="picker">
        <div className="picker-panel">
          <div className="picker-choose">
            <span className="cancel" onClick={onCancel}>
              {cancelLabel}
            </span>
            <span
              className="confirm"
              onClick={() => {
                onOk(getData());
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
