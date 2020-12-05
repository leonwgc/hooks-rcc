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

export default function usePullupLoadMore(ref, threshold = 10) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const onScroll = debounce(() => {
      if (
        ref.current.scrollTop + ref.current.offsetHeight + threshold >=
        ref.current.scrollHeight
      ) {
        setPage((p) => p + 1);
      }
    }, 60);
    const options = passiveSupported ? { passive: true } : false;
    ref.current.addEventListener('scroll', onScroll, options);
    return () => ref.current.removeEventListener('scroll', onScroll, options);
  }, []);

  return { page };
}
