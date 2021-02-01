import React, {useState} from 'react';
import updateTheme, {defaultBrandColor} from '~/make/Theme';
import './Header.less';

export default function Header() {
  const [color, setColor] = useState(defaultBrandColor);
  const onChange = e => {
    updateTheme({brandColor: e.target.value});
    setColor(e.target.value);
  };
  return (
    <div className="ns-header">
      web design
      <input type="color" onChange={onChange} className="color" value={color} />
    </div>
  );
}
