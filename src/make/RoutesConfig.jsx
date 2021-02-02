import App from './App';
import H5 from './frames/H5';

const routes = [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '/m',
    component: H5,
  },
];

export default routes;
