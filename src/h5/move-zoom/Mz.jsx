import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'zarm';
import BScroll from 'better-scroll';
import './Mz.less';

const startPosition = [417, 317];

export default function Mz() {
  const ref = useRef();
  const bs = useRef();

  useEffect(() => {
    bs.current = new BScroll(ref.current, {
      bindToTarget: true,
      scrollX: true,
      scrollY: true,
      freeScroll: true,
      bounce: true,

      startX: startPosition[0],
      startY: startPosition[1],
      // enable: false,
      movable: true, // for movable plugin
      zoom: {
        // for zoom plugin
        start: .7,
        min: 0.2,
        max: 3,
      },
    });

    bs.current.on('scrollEnd', () => {
      console.log(`x:${bs.current.x},y:${bs.current.y}`);
    });

    bs.current.on('zoomEnd', () => {
      // bs.current.refresh();
    });

    setTimeout(() => {
      bs.current.putAt(startPosition[0], startPosition[1]);
      bs.current.refresh();
    }, 0);

    return () => bs.current.destroy();
  }, []);

  const zoomTo = (scale) => {
    bs.current.zoomTo(scale, 0, 0);
  };

  return (
    <div>
      <div className="bs-wrapper" ref={ref}>
        <div className="bs-content"></div>
      </div>
      <div>
        <Button
          onClick={() => {
            zoomTo(0.5);
          }}
        >
          zoomTo-0.5
        </Button>
        <Button
          onClick={() => {
            zoomTo(1);
          }}
        >
          zoomTo-1
        </Button>
        <Button
          onClick={() => {
            zoomTo(2);
          }}
        >
          zoomTo-2
        </Button>
      </div>
    </div>
  );
}
