import { lazy } from 'react';

const routes = [
  {
    path: '/biz1',
    exact: true,
    component: lazy(() => import('./Page1')),
  },
  {
    path: '/biz1/page2',
    component: lazy(() => import('./Page2')),
  },
];

export default routes;
