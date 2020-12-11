import React, { useEffect, useRef, useState } from 'react';
import { SearchBar } from 'zarm';
import './SearchFilter.less';

export default function SearchFilter({ dataArray = [], onItemClick, visible = false }) {
  const [data, setData] = useState(dataArray);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      setData(
        dataArray.filter((v) => {
          return v.label.indexOf(value) > -1;
        })
      );
    } else {
      setData(dataArray);
    }
  }, [value, dataArray]);

  return visible ? (
    <div className="search-filter ">
      <div className="bar">
        <SearchBar
          placeholder="搜索"
          cancelText="取消"
          value={value}
          onChange={setValue}
          onCancel={() => setValue('')}
          onClear={() => {
            setValue('');
          }}
        />
      </div>
      <div className="item-list">
        {data.map((item, idx) => (
          <div key={idx} data-item={item} onClick={() => onItemClick(item)}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
