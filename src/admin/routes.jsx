import { lazy } from 'react';

import biz1Routes from './biz1/routes';
import biz2Routes from './biz2/routes';

const common = [
  {
    path: '/login',
    component: lazy(() => import('./Login')),
  },
];

const routes = [...common, ...biz1Routes, ...biz2Routes];

export default routes;
