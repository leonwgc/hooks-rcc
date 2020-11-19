import React, { useState, useRef, useEffect } from 'react';
import BScroll from 'better-scroll';
import './Picker.less';

const noop = () => {};

export default function Picker({
  value = '',
  data = [],
  onChange = noop,
  onOk = noop,
  onCancel = noop,
  title = '请选择',
  okLabel = '确定',
  cancelLabel = '取消',
}) {
  const [index, setIndex] = useState(() => {
    let selectedIndex = 0;
    if (value != null) {
      selectedIndex = data.findIndex((item) => item.value == value);
      if (selectedIndex === -1) {
        selectedIndex = 0;
      }
    }
    return selectedIndex;
  });
  const ref = useRef();
  const weelRef = useRef();

  useEffect(() => {
    weelRef.current = new BScroll(ref.current, {
      wheel: {
        selectedIndex: index,
        wheelWrapperClass: 'wheel-scroll',
        wheelItemClass: 'wheel-item',
        wheelDisabledItemClass: 'wheel-disabled-item',
      },
      useTransition: true,
      probeType: 3,
    });

    weelRef.current.on('scrollEnd', () => {
      setIndex(weelRef.current.getSelectedIndex());
    });
  }, []);

  useEffect(() => {
    weelRef.current.refresh();
    onChange(data[index]);
  }, [index]);

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
                // const index = weelRef.current.getSelectedIndex();
                onOk(data[index]);
              }}
            >
              {okLabel}
            </span>
            <h1 className="picker-title">{title}</h1>
          </div>
          <div className="picker-content">
            <div className="mask-top border-bottom-1px"></div>
            <div className="mask-bottom border-top-1px"></div>
            <div className="wheel-wrapper">
              <div className="wheel" ref={ref}>
                <ul className="wheel-scroll">
                  {data.map((item, idx) => (
                    <li
                      className={`wheel-item ${item.disabled ? 'wheel-disabled-item' : ''}`}
                      key={idx}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="picker-footer"></div>
        </div>
      </div>
    </div>
  );
}
