import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
// import App from './App1';
import App from './App';
import 'antd/dist/antd.less';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
