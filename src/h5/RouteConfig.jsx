import { lazy } from 'react';

const routes = [
  {
    path: '/popup',
    component: lazy(() => import('./popup/index')),
  },
  {
    path: '/svg',
    component: lazy(() => import('./Svg')),
  },
];

export default routes;
