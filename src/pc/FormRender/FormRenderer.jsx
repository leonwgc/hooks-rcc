import React from 'react';
import { Form, Row, Col } from 'antd';

export default function FormRenderer({ layoutData }) {
  return (
    <div className="renderer">
      {layoutData.map((arr, idx) => {
        const len = arr.length;
        if (24 % len !== 0) {
          throw new Error('arr length should be divided by 24');
        }

        const span = 24 / len;

        return (
          <Row key={idx} gutter={{ xs: 8, sm: 16, md: 24 }}>
            {arr.map((item, itemIdx) => {
              const { type, name, rules, label, description, items, ...props } = item;
              return (
                <Col span={span} key={itemIdx}>
                  <Form.Item name={name} label={label} rules={rules}>
                    {React.createElement(type, props)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
}
