import React, { useEffect, useRef, useState } from 'react';
import { flex } from './components/index';
import Flex from './components/Flex';
import * as storage from './storage';
import Sortable from 'sortablejs';

export default function TplSelectList() {
  const ref = useRef(null);
  const list = storage.getList();

  useEffect(() => {
    if (ref.current) {
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
    }
  }, []);

  return (
    <ul ref={ref}>
      {list.map((item, idx) => (
        <li key={idx} data-cid={flex.cid} data-tpl={JSON.stringify(item)} className="cmp panel-cmp">
          {/* <Flex item={item} /> */}
          {item.name}
        </li>
      ))}
    </ul>
  );
}
