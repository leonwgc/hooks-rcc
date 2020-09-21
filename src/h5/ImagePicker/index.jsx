import React, { useState } from 'react';
import ImagePicker from './ImagePicker';

export default function IndexPicker() {
  const [data, setData] = useState([
    {
      id: 3845013,
      href: 'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
    },
    {
      id: 3845013,
      href: 'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
    },
  ]);

  return (
    <div>
      <ImagePicker
        onChange={(data) => {
          console.log(data), setData(data);
        }}
        text="正面"
        formData={{ storeType: 'I', type: '39' }}
        multiple
        data={data}
      />
    </div>
  );
}
