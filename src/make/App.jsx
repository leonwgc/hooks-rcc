import React from 'react';
import Header from './Header';
import ComponentPanel from './ComponentPanel';
import Stage from './Stage';
import PropSetting from './SettingPanel';
import Footer from './Footer';

import './App.less';

export default function App({ history }) {
  return (
    <div className="ns-main">
      <Header />
      <div className="section">
        <ComponentPanel />
        <div className="main">
          <Stage />
        </div>
        <PropSetting />
      </div>
      <Footer />
    </div>
  );
}
