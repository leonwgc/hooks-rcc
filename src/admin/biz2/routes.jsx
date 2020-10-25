import { lazy } from 'react';

const routes = [
  {
    path: '/biz2/page1',
    component: lazy(() => import('./Page1')),
  },
  {
    path: '/biz2/page2',
    component: lazy(() => import('./Page2')),
  },
];

export default routes;
