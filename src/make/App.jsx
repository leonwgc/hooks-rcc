import React from 'react';
import {Provider} from 'react-redux';
import Header from './frames/Header';
import Left from './frames/Left';
import Stage from './frames/Stage';
import PropSetting from './frames/PropSetting';
import configureStore from './stores/configureStore';
import './App.less';

const store = configureStore();

export default function Main() {
  return (
    <Provider store={store}>
      <div className="ns-main">
        <Header />
        <div className="section">
          <div className="left">
            <Left />
          </div>
          <div className="main">
            <Stage />
          </div>
          <PropSetting />
        </div>
      </div>
    </Provider>
  );
}
