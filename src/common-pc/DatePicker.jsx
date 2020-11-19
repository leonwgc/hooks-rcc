import React, { useState } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs from 'dayjs';

const DatePicker = ({ value, onChange, dateFormat = 'YYYY-MM-DD', ...elProps }) => {
  const [v, setV] = useState(value ? dayjs(value) : null);
  const myOnChange = (mv) => {
    setV(mv);
    if (!mv) {
      onChange(mv);
    } else {
      onChange(mv.format(dateFormat));
    }
  };
  return <AntDatePicker value={v} onChange={myOnChange} {...elProps}></AntDatePicker>;
};

export default DatePicker;
