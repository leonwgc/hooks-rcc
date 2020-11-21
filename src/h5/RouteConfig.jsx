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
    component: lazy(() => import('./pullup/Pullup')),
  },
  {
    path: '/svg',
    component: lazy(() => import('./Svg')),
  },
];

export default routes;
