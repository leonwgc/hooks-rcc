import React, { useState } from 'react';
import { ActivityIndicator } from 'zarm';

const data = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   xmlns:oryx="http://www.b3mn.org/oryx"
   width="40"
   height="40"
   version="1.0">
  <defs></defs>
  <oryx:magnets>
  	<oryx:magnet oryx:cx="16" oryx:cy="16" oryx:default="yes" />
  </oryx:magnets>
  <g pointer-events="fill">
    <circle id="bg_frame" cx="16" cy="16" r="10" stroke="#ccc" fill="#ccc" stroke-width="0"/>
	<text font-size="11" 
		id="text_name" 
		x="16" y="32" 
		oryx:align="top center" 
		stroke="#373e48"
	></text>
  </g>
</svg>


<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   xmlns:oryx="http://www.b3mn.org/oryx"
   width="40"
   height="40"
   version="1.0">
  <defs></defs>
  <oryx:magnets>
  	<oryx:magnet oryx:cx="16" oryx:cy="16" oryx:default="yes" />
  </oryx:magnets>
  <g pointer-events="fill">
    <circle id="bg_frame" cx="16" cy="16" r="15" stroke="#3362A9" fill="#0D72FF" stroke-width="1"/>
	<text font-size="11" 
		id="text_name" 
		x="16" y="33" 
		oryx:align="top center" 
		stroke="#373e48"
	></text>
  </g>
</svg>
`;

const Svg = () => {
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

const SVG1 = () => {
  const rectClick = (e) => {
    e.target.setAttributeNS(null, 'width', '60');
    e.target.setAttributeNS(null, 'height', '60');
  };

  return (
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100" rx="15" ry="15" onClick={rectClick}>
        <animate attributeName="fill" from="green" to="red" dur="2s" fill="freeze"></animate>
        <animateTransform
          attributeName="transform"
          type="scale"
          from="0"
          to="2"
          dur="1s"
          repeatCount="1"
          fill="freeze" //fill: 动画结束之后的状态 保持freeze结束状态/remove恢复初始状态（默认值）
        />
      </rect>
    </svg>
  );
};

export default Svg;
