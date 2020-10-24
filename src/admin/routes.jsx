import { lazy } from 'react';

const routes = [
  {
    path: '/formrender',
    component: lazy(() => import('./FormRender/App')),
  },
];

export default routes;
