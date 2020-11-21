import React, { useEffect, useRef, useState } from 'react';
import BScroll from 'better-scroll';
import './Slide.less';

export default function Slide() {
  const ref = useRef();
  const bs = useRef();

  const [index, setIndex] = useState(0);

  const data = [1, 2, 3, 4];

  useEffect(() => {
    bs.current = new BScroll(ref.current, {
      scrollX: true,
      scrollY: false,
      slide: true,
      useTransition: true,
      momentum: false,
      bounce: false,
      stopPropagation: true,
      probeType: 3,
      slide: {
        threshold: 100,
        loop: true,
        autoplay: true,
      },
    });

    bs.current.on('slideWillChange', (page) => {
      setIndex(page.pageX);
    });

    return () => bs.current.destroy();
  }, []);

  return (
    <div className="slide-wrapper">
      <div className="slide-wrapper__banner">
        <div className="slide-wrapper__banner__wrapper" ref={ref}>
          <div className="slide-wrapper__banner__wrapper__content">
            {data.map((item, idx) => (
              <div className={`slide-page p${idx}`} key={idx}>
                Page {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slide-wrapper__dot">
        {data.map((item, idx) => (
          <div
            onClick={() => bs.current.goToPage(idx, 0)}
            className={`dot ${idx === index ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
