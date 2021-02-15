/**
 *
 * asynLoad 延迟异步加载 js / css文件
 * 调用方式:
 * 1. import asynLoad from 'utils';
 * 2. asynLoad(['url1','url2']).then()
 * 3. asynLoad('url3').then()
 *
 */

export default function (url) {
  if (!url) return Promise.reject();

  if (typeof url === 'string') {
    return loadResource(url);
  }
  if (Array.isArray(url)) {
    return Promise.all(url.map(loadResource));
  }
  return Promise.reject(url);
}

function loadResource(url) {
  let dom;
  dom = document.getElementById(url);
  if (dom) return Promise.resolve();

  // 加载css
  if (/\.css$/.test(url)) {
    dom = document.createElement('link');
    dom.rel = 'stylesheet';
    dom.href = url;
  } else {
    dom = document.createElement('script');
    dom.src = url;
  }
  dom.id = url;
  return new Promise((resolve, reject) => {
    dom.onload = resolve;
    document.body.appendChild(dom);
  });
}
