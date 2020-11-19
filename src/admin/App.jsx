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
import routes from './routes';
import PageLoading from './common/PageLoading';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<PageLoading />}>
            <Switch>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </Suspense>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default hot(App);
