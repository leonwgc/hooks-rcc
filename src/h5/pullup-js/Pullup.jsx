import React, { useEffect, useRef, useState, useCallback } from 'react';
import usePullupLoadMore from '~/hooks/usePullupLoadMore';
import { ActivityIndicator } from 'zarm';
import './Pullup.less';

const pageSize = 20;

export default function Pullup() {
  const [isLoading, setLoading] = useState(false);
  const ref = useRef();
  const [data, setData] = useState([]);

  const { page } = usePullupLoadMore({
    // useWindow: true,
    ref,
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      return new Promise((resolve) => {
        var ar = [];
        for (var i = 0; i < pageSize; i++) {
          ar.push((page - 1) * pageSize + i + 1);
        }
        setTimeout(() => {
          setData((d) => d.concat(ar));
          resolve();
        }, 1000);
      }).then(() => {
        setLoading(false);
      });
    };
    fetchData();
  }, [page]);

  return (
    <div className="pullup-wrapper" ref={ref}>
      <div className="pullup-content">
        {data.map((item, idx) => (
          <div key={idx} className="item" data-item={item} onClick={() => console.log(item)}>
            list {item}
          </div>
        ))}
        <div className="loading-tip">{isLoading ? <ActivityIndicator size="lg" /> : ''}</div>
      </div>
    </div>
  );
}
