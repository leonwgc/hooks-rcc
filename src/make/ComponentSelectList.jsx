import React, { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

export default function ComponentSelectList({ components = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    let s = Sortable.create(ref.current, {
      sort: false,
      group: {
        name: 'cmp',
        pull: 'clone',
      },
    });

    return () => {
      s.destroy();
    };
  }, []);

  if (!components.length) return null;

  return (
    <ul ref={ref}>
      {components.map((item, idx) => (
        <li key={idx} data-cid={item.cid} className="cmp panel-cmp">
          {item.designRender()}
        </li>
      ))}
    </ul>
  );
}
