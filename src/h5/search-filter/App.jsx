import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'zarm';
import { cities } from './city';
import SearchFilter from './SearchFilter';

export default function App({}) {
  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState('');

  return (
    <div>
      <SearchFilter
        dataArray={cities}
        visible={visible}
        onItemClick={(item) => {
          setValue(item.value);
          setVisible(false);
        }}
      />
      <Button onClick={() => setVisible((v) => !v)}>toggle {value}</Button>
    </div>
  );
}
