import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Renderer from './Renderer';

import './Stage.less';

const H5 = () => {
  let data = localStorage.getItem('m');
  const app = JSON.parse(data);
  return <Renderer isDesign={false} item={app} isTop={true} />;
};

export default H5;
