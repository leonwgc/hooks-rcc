import { lazy } from 'react';

const routes = [
  {
    path: '/popup',
    component: lazy(() => import('./popup/index')),
  },
  {
    path: '/image-picker',
    component: lazy(() => import('./ImagePicker/index')),
  },
  {
    path: '/picker',
    component: lazy(() => import('./picker/Picker')),
  },
  {
    path: '/slide',
    component: lazy(() => import('./slide/Slide')),
  },
  {
    path: '/pullup',
    component: lazy(() => import('./pullup-js/Pullup')),
  },
  {
    path: '/mz',
    component: lazy(() => import('./move-zoom/Mz')),
  },
  {
    path: '/svg',
    component: lazy(() => import('./Svg')),
  },
  {
    path: '/sig',
    component: lazy(() => import('./sig/Sig')),
  },
];

export default routes;
