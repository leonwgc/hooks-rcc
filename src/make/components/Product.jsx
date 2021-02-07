import React, { useRef, useEffect } from 'react';
import './Product.less';

export default function Product({ link, src, desc, title, style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    // cssText 优先
    const { cssText = '' } = style;
    if (cssText) {
      ref.current.style.cssText = cssText;
    }
  });

  return (
    <div
      className="product"
      style={style}
      ref={ref}
      onClick={link ? () => (location.href = link) : null}
    >
      <div className="eve-image">
        <img src={src} alt="product" />
      </div>
      <div>
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
      </div>
    </div>
  );
}
