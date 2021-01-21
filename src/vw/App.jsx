import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import routes from './Routes';
import 'zarm/dist/zarm.min.css';
import { ActivityIndicator } from 'zarm';

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<ActivityIndicator />}>
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

export default Routes;
