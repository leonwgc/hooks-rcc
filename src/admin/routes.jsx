import { lazy } from 'react';

import biz1Routes from './biz1/routes';
import biz2Routes from './biz2/routes';

const routes = [...biz1Routes, ...biz2Routes];

export default routes;
