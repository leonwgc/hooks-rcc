import { getHostPrefix } from './host';
import fetchFactory from './fetch';

const host = `//${getHostPrefix()}api.zuifuli.com`;

export const get = fetchFactory('get', host);
export const post = fetchFactory('post', host);
export const put = fetchFactory('put', host);
export const del = fetchFactory('delete', host);
