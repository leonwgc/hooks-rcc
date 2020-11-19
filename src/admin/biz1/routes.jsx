import { lazy } from 'react';

const basePath = '/biz1';

const routes = [
  {
    path: `${basePath}/page1`,
    component: lazy(() => import('./Page1')),
  },
  {
    path: `${basePath}/page2`,
    component: lazy(() => import('./Page2')),
  },
  {
    path: `${basePath}/list`,
    component: lazy(() => import('./List')),
  },
];

export default routes;
