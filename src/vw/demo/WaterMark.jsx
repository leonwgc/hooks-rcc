import React, { useEffect, useRef, useState } from 'react';
import { Radio, DateSelect, Cell, Calendar } from 'zarm';
import './WaterMark.less';

const text = '请勿泄露 WANG Leon';

export default function WaterMark() {
  const [multiple, setMultiple] = useState(true);
  const [value, setValue] = useState(['2020-07-29', '2020-08-04']);
  const [min, setMin] = useState('2017-12-29');
  const [max, setMax] = useState('2020-08-04');
  const [custom, setCustom] = useState(false);

  const ref = useRef();

  useEffect(() => {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    ctx.rotate((Math.PI * -13) / 180);
    ctx.font = '24px Microsoft Yahei';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, 0, 100, 150);

    document.querySelector('.water-mark').style.backgroundImage =
      'url(' + canvas.toDataURL('image/png') + ')';

    ref.current.style.height = document.body.scrollHeight + 'px';
    // document.querySelector('.water-mark').appendChild(canvas);
  }, []);

  return (
    <div>
      <div className="water-mark" ref={ref}></div>
      <Calendar
        multiple={true}
        value={value}
        min={min}
        max={max}
        dateRender={(date) => {
          if (custom && /(0|6)/.test(date.getDay())) {
            return (
              <div className="custom">
                <div className="custom__date">{date.getDate()}</div>
                <div className="custom__text">Closed</div>
              </div>
            );
          }
          return date.getDate();
        }}
        disabledDate={(date) => {
          if (custom) return /(0|6)/.test(date.getDay());
          return false;
        }}
        onChange={(value) => {
          setValue(value);
          console.log('onChange', value);
        }}
      />
    </div>
  );
}
