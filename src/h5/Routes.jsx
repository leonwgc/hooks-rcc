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
  {
    path: '/animate',
    component: lazy(() => import('./animate/App')),
  },
  {
    path: '/ip',
    component: lazy(() => import('./ImagePicker/')),
  },
  {
    path: '/search-filter',
    component: lazy(() => import('./search-filter/App')),
  },
  {
    path: '/g',
    component: lazy(() => import('./g/App')),
  },
  {
    path: '/i18',
    component: lazy(() => import('./i18nnext/App')),
  },
  {
    path: '/pixi',
    component: lazy(() => import('./pixi/App')),
  },
  {
    path: '/dm',
    component: lazy(() => import('./dragmove/App')),
  },
  {
    path: '/phaser',
    component: lazy(() => import('./phaser/App')),
  },
];

export default routes;
