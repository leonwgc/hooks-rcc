import React, { useEffect, useRef, useState } from 'react';

function debounce(fn, timeout) {
  let timer;

  return function (...args) {
    let that = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, timeout);
  };
}

let passiveSupported = false;

try {
  const options = {
    get passive() {
      passiveSupported = true;
      return false;
    },
  };

  window.addEventListener('test', null, options);
  window.removeEventListener('test', null, options);
} catch (err) {
  passiveSupported = false;
}

const doScrollCheck = (el, threshold) => {
  return el === window
    ? window.pageYOffset + window.innerHeight + threshold >= document.documentElement.scrollHeight
    : el.scrollTop + el.offsetHeight + threshold >= el.scrollHeight;
};

export default function usePullupLoadMore({ ref, useWindow = false, threshold = 10 }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (useWindow) {
      ref = { current: window };
    }
    const onScroll = debounce(() => {
      if (doScrollCheck(ref.current, threshold)) {
        setPage((p) => p + 1);
      }
    }, 60);
    const options = passiveSupported ? { passive: true } : false;
    ref.current.addEventListener('scroll', onScroll, options);
    return () => ref.current.removeEventListener('scroll', onScroll, options);
  }, []);

  return { page };
}
