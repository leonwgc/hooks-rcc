import React, { useState } from 'react';
import { ActivityIndicator } from 'zarm';

const data = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   xmlns:oryx="http://www.b3mn.org/oryx"
   width="110"
   height="42"
   version="1.0">
  <defs></defs>
  <oryx:magnets>
  	<oryx:magnet oryx:cx="31" oryx:cy="31" oryx:default="yes" />
  </oryx:magnets>
  <g pointer-events="fill">
    <rect id="bg_frame" x="30" y="30" width="110" height="42" stroke="#585858" fill="#0d72ff" stroke-width="1"/>
	<text font-size="14" 
		id="text_name" 
		x="31" y="35" 
		oryx:align="top center" 
		fill="#fff"
	></text>
  </g>
</svg>
`;

const Svg = () => {
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

export default Svg;
