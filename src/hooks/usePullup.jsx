import React, { useEffect, useRef, useState } from 'react';
import BScroll from 'better-scroll';
import useUpdateEffect from '~/hooks/useUpdateEffect';

export default function usePullup({ ref, loadMore, threshold = 90 }) {
  const bs = useRef();
  const [isPulling, setIsPulling] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    bs.current = new BScroll(ref.current, {
      click: true,
      pullUpLoad: {
        threshold,
      },
    });

    bs.current.on('pullingUp', () => {
      setPageIndex((p) => p + 1);
    });

    return () => bs.current.destroy();
  }, []);

  useUpdateEffect(() => {
    setIsPulling(true);
    loadMore(pageIndex).then(() => {
      bs.current.finishPullUp();
      bs.current.refresh();
      setIsPulling(false);
    });
  }, [pageIndex]);

  return isPulling;
}
