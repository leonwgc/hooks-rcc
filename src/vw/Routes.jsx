import { lazy } from 'react';

const routes = [
  {
    path: '/test',
    component: lazy(() => import('./demo/WaterMark')),
  },
];

export default routes;
