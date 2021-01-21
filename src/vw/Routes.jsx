import { lazy } from 'react';

const routes = [
  {
    path: '/test',
    component: lazy(() => import('./demo/Page1')),
  },
];

export default routes;
