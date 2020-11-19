import React from 'react';
import { Spin } from 'antd';

export default function PageLoading() {
  return (
    <div className="page-loading">
      <Spin />
    </div>
  );
}
