import React, { useRef, useEffect } from 'react';
import Carousel from 'nuka-carousel';
import './Carousel.less';

export default function MyCarousel({
  autoplay,
  wrapAround,
  autoplayInterval,
  images = [],
  height,
  vertical = false,
  slidesToShow = 1,
}) {
  const contentRender = () => {
    return images.map((item, i) => {
      return <img src={item.url} key={+i} className="carousel-pic-item" />;
    });
  };

  const defaultControlsConfig = {
    prevButtonStyle: { display: 'none' },
    nextButtonStyle: { display: 'none' },
    pagingDotsStyle: { fill: '#fff' },
  };

  return (
    <div style={{ height, width: '100%' }}>
      <Carousel
        vertical={vertical}
        autoplay={autoplay}
        autoplayInterval={autoplayInterval}
        slidesToShow={slidesToShow}
        defaultControlsConfig={defaultControlsConfig}
        initialSlideHeight={height}
        wrapAround={wrapAround}
      >
        {contentRender()}
      </Carousel>
    </div>
  );
}
