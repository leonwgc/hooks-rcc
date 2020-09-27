import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from '../h5/PageNotFound';
import routes from './RouteConfig';
import { Spin } from 'antd';
import 'dayjs/locale/zh-cn'; // load on demand
import dayjs from 'dayjs';
import './App.less';

dayjs.locale('zh-cn');

const Loading = () => {
  return (
    <div className="my-loading">
      <Spin />
    </div>
  );
};

const Routes = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} exact={route.exact} component={route.component} />
            ))}
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default hot(Routes);
