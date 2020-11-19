import React, { useCallback } from 'react';
import { Form, Row, Col } from 'antd';

// 默认二维数组
// 如果是一维数组，则从上往下一行放一个 item
// 如果是二维数组，则每个子数组元素的数量，则为一行显示的item数量 ,数量应该可以被24整除
export default function FormRenderer({ layoutData }) {
  let useOneColumnInRow = false;
  const firstItem = layoutData[0];
  if (!Array.isArray(firstItem)) {
    useOneColumnInRow = true;
  }

  const itemRender = (item, key, span = 24) => {
    const { type, name, rules, label, elProps = {}, render, ...props } = item;

    return span != 24 ? (
      <Col span={span} key={key}>
        <Form.Item name={name} label={label} rules={rules}>
          {!render ? React.createElement(type, { ...props, ...elProps }) : render()}
        </Form.Item>
      </Col>
    ) : (
      <Row key={key} gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={span}>
          <Form.Item name={name} label={label} rules={rules}>
            {!render ? React.createElement(type, { ...props, ...elProps }) : render()}
          </Form.Item>
        </Col>
      </Row>
    );
  };

  return !useOneColumnInRow ? (
    <div className="renderer">
      {layoutData.map((arr, idx) => {
        const len = arr.length;
        if (24 % len !== 0) {
          throw new Error('数组的长度必须能被24整除');
        }
        const span = 24 / len;
        return (
          <Row key={idx} gutter={{ xs: 8, sm: 16, md: 24 }}>
            {arr.map((item, subIndex) => itemRender(item, subIndex, span))}
          </Row>
        );
      })}
    </div>
  ) : (
    <div className="renderer">{layoutData.map((item, idx) => itemRender(item, idx, 24))}</div>
  );
}
