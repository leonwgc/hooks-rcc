import React, { useState, useRef, useEffect } from 'react';
import BScroll from 'better-scroll';
import './Picker.less';

const data = [
  {
    text: 'Venomancer',
    value: 1,
    disabled: 'wheel-disabled-item',
  },
  {
    text: 'Nerubian Weaver',
    value: 2,
  },
  {
    text: 'Spectre',
    value: 3,
  },
  {
    text: 'Juggernaut',
    value: 4,
  },
  {
    text: 'Karl',
    value: 5,
  },
  {
    text: 'Zeus',
    value: 6,
  },
  {
    text: 'Witch Doctor',
    value: 7,
  },
  {
    text: 'Lich',
    value: 8,
  },
  {
    text: 'Oracle',
    value: 9,
  },
  {
    text: 'Earthshaker',
    value: 10,
  },
];

export default function Picker() {
  // const [visible, setVisible] = useState(false);

  const [index, setIndex] = useState(2);
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

    console.log(weelRef.current.getSelectedIndex());
  }, [index]);

  return (
    <div className="container">
      <div className="picker">
        <div className="picker-panel">
          <div className="picker-choose border-bottom-1px">
            <span className="cancel">Cancel</span>
            <span className="confirm">Confirm</span>
            <h1 className="picker-title">Title</h1>
          </div>
          <div className="picker-content">
            <div className="mask-top border-bottom-1px"></div>
            <div className="mask-bottom border-top-1px"></div>
            <div className="wheel-wrapper">
              <div className="wheel" ref={ref}>
                <ul className="wheel-scroll">
                  {data.map((item, idx) => (
                    <li className="wheel-item" key={idx}>
                      {item.text}
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
