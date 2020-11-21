import React, { useEffect, useRef, useState } from 'react';
import usePullup from '~/hooks/usePullup';
import './Pullup.less';

export default function Pullup() {
  const ref = useRef();
  const [data, setData] = useState([]);

  const fetchData = (pageIndex) => {
    return new Promise((resolve) => {
      var ar = [];
      for (var i = 0; i < 10; i++) {
        ar.push(pageIndex * 10 + i);
      }
      setTimeout(() => {
        setData((d) => d.concat(ar));
        resolve(ar);
      }, 1000);
    });
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  const isPulling = usePullup({ ref, fetchData });

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
