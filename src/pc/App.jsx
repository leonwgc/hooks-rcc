import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from '../h5/PageNotFound';
import routes from './RouteConfig';
import { Spin } from 'antd';
import './App.less';

const Loading = () => {
  return (
    <div className="my-loading">
      <Spin />
    </div>
  );
};

const Routes = () => {
  return (
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
  );
};

export default hot(Routes);
