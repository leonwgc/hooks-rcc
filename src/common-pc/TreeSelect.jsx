import React, { useState, useEffect, useRef } from 'react';
import { Select, Icon, TreeSelect as AntdTreeSelect, Modal, Button, Spin } from 'antd';
import { getHostPrefix } from '~/utils/host';
import fetchFactory from '~/utils/fetch';

export const get = fetchFactory('get', '');

function flat(data, getTitle, getValue) {
  data.value = getValue(data);
  data.title = getTitle(data);
  data.key = data.value;
  if (!data.children) {
    return [data];
  }
  let result = [data];
  for (let item of data.children) {
    result = result.concat(flat(item, getTitle, getValue));
  }

  return result;
}

function normalizeValue(value = [], getValue) {
  return value.map((item) => getValue(item));
}

export default function TreeSelect({
  value = [],
  onChange,
  getTitle = (item) => item.orgName,
  getValue = (item) => item.orgCustId,
}) {
  const [data, setData] = useState([]);
  const flatRef = useRef([]);
  const [loading, setLoading] = useState(true);

  const [v, setV] = useState(normalizeValue(value, getValue));

  useEffect(() => {
    get('https://t-api.zuifuli.com/api/bpmPlus/v5/org/hierarchy/tree').then(({ result = {} }) => {
      flatRef.current = flat(result, getTitle, getValue);
      setData([result]);
      setLoading(false);
    });
  }, []);

  const onDataChange = (v) => {
    v = v || [];
    setV(v);
    const v1 = flatRef.current.filter((item) => v.includes(getValue(item)));

    onChange(v1);
  };

  return (
    <Spin spinning={loading}>
      <AntdTreeSelect
        style={{ width: '100%' }}
        value={v}
        treeData={data}
        treeNodeFilterProp="title"
        multiple
        placeholder="请选择"
        treeDefaultExpandAll={false}
        onChange={onDataChange}
      />
    </Spin>
  );
}
