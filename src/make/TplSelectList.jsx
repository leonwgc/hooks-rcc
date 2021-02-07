import React, { useEffect, useRef, useState } from 'react';
import { flex } from './components/index';
import { DeleteOutlined } from '@ant-design/icons';
import * as storage from './storage';
import useUpdateStore from './hooks/useUpdateStore';
import Sortable from 'sortablejs';

export default function TplSelectList() {
  const ref = useRef(null);
  const updateStore = useUpdateStore();
  const list = storage.getList() || [];

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
        try {
          s.destroy();
        } catch (ex) {
          console.log(ex);
        }
      };
    }
  }, []);

  return (
    <ul ref={ref}>
      {list.map((item, idx) => (
        <li
          key={idx}
          data-cid={flex.cid}
          data-tpl={JSON.stringify(item)}
          style={{ position: 'relative' }}
          className="cmp panel-cmp"
        >
          {item.name}
          <DeleteOutlined
            onClick={() => {
              storage.remove(item.tid);
              updateStore({ _f: Math.random() });
            }}
            style={{
              color: 'pink',
              fontSize: 16,
              cursor: 'pointer',
              position: 'absolute',
              right: 5,
              bottom: 22,
            }}
          />
        </li>
      ))}
    </ul>
  );
}
