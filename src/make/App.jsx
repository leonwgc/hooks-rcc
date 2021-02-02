import React from 'react';
import { Provider } from 'react-redux';
import Header from './frames/Header';
import Left from './frames/Left';
import Stage from './frames/Stage';
import PropSetting from './frames/PropSetting';

import './App.less';

export default function App({ history }) {
  return (
    <div className="ns-main">
      <Header />
      <div className="section">
        <div className="left">
          <Left />
        </div>
        <div className="main">
          <Stage history={history} />
        </div>
        <PropSetting />
      </div>
    </div>
  );
}
