import { lazy } from 'react';

const routes = [
  {
    path: '/biz1/page1',
    component: lazy(() => import('./Page1')),
  },
  {
    path: '/biz1/page2',
    component: lazy(() => import('./Page2')),
  },
];

export default routes;
