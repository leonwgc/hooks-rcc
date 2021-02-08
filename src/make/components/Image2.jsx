import React from 'react';

export default function Image2({ src1 = '', src2 = '', style = {} }) {
  const _style = { ...style };

  const arr = [src1, src2];

  return (
    <div
      style={{
        display: 'flex',
        ..._style,
      }}
    >
      {arr.map((src, idx) => (
        <img src={src} key={idx} style={{ width: '50%' }} />
      ))}
    </div>
  );
}
