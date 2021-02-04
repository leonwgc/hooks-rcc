import React, { useState } from 'react';
import updateTheme, { defaultBrandColor } from '~/make/Theme';
import './Header.less';

export default function Header() {
  const [color, setColor] = useState(defaultBrandColor);
  const onChange = (e) => {
    updateTheme({ brandColor: e.target.value });
    setColor(e.target.value);
  };
  return (
    <div className="ns-header">
      <div className="title">装修管理台</div>
      {/* <input type="color" onChange={onChange} className="color" value={color} /> */}
    </div>
  );
}
