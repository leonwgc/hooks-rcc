import { lazy } from 'react';

const routes = [
  {
    path: '/page1',
    component: lazy(() => import('./Page1')),
  },
];

export default routes;
