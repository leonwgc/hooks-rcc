import { hot } from 'react-hot-loader/root';
import React, { Suspense, useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn'; // load on demand
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HashRouter as Router, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import store, { history } from './store';
import dayjs from 'dayjs';
import Layout from './layout/Layout';
import Login from './Login';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" component={Layout}></Route>
            <Redirect to="/admin" />
          </Switch>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default hot(App);
