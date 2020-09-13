import { lazy } from 'react';

const routes = [
  {
    path: '/popup',
    component: lazy(() => import('./popup')),
  },
];

export default routes;
