import React, { useEffect, useRef, useState } from 'react';
import BScroll from 'better-scroll';
import useUpdateEffect from '~/hooks/useUpdateEffect';
import './Pullup.less';

const loadMore = (page) => {
  return new Promise((resolve) => {
    var ar = [];
    for (var i = 0; i < 10; i++) {
      ar.push((page - 1) * 10 + i);
    }

    setTimeout(() => {
      resolve(ar);
    }, 1000);
  });
};

export default function Pullup() {
  const ref = useRef();
  const bs = useRef();

  const [isPulling, setIsPulling] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadMore(page).then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    bs.current = new BScroll(ref.current, {
      click: true,
      pullUpLoad: {
        threshold: 90,
      },
    });

    bs.current.on('pullingUp', () => {
      setPage((p) => p + 1);
    });

    return () => bs.current.destroy();
  }, []);

  useUpdateEffect(() => {
    setIsPulling(true);
    loadMore(page).then((data) => {
      setData((d) => d.concat(data));
      bs.current.finishPullUp();
      bs.current.refresh();
      setIsPulling(false);
    });
  }, [page]);

  return (
    <div className="pullup-wrapper" ref={ref}>
      <div className="pullup-content">
        {data.map((item, idx) => (
          <div key={idx} className="item" data-item={item} onClick={() => console.log(item)}>
            list {item}
          </div>
        ))}
        <div className="loading-tip">{isPulling ? 'Loading...' : ''}</div>
      </div>
    </div>
  );
}
