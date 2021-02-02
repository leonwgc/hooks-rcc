import React, { useRef, useEffect } from 'react';
import { Carousel as ZarmCarousel } from 'zarm';

export default function MyCarousel({
  loop = true,
  images = [],
  style = { width: 375, height: 160 },
}) {
  const contentRender = () => {
    return images.map((item, i) => {
      return (
        <div style={{ width: '100vw', height: 160 }} key={+i}>
          <img src={item.url} alt={item.name} draggable={false} />
        </div>
      );
    });
  };

  return <ZarmCarousel loop={loop}>{contentRender()}</ZarmCarousel>;
}
