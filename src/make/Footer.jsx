import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Space } from 'antd';
import { update } from './stores/actions';
import Renderer from './Renderer';
import './Footer.less';

export default function Footer() {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const onPreview = () => {
    update(dispatch)({ ...app, preview: true });
    // localStorage.setItem('m', JSON.stringify(app));
  };

  const onClear = () => {
    update(dispatch)({ comps: [], activeComp: null });
  };

  return (
    <div className="footer">
      <div className="content">
        <Space>
          <Button type="primary">发布</Button>
          <Button type="default" onClick={onPreview}>
            预览
          </Button>
          <Button type="default" onClick={onClear}>
            清空
          </Button>
        </Space>
      </div>
      <Modal
        style={{ top: 10 }}
        bodyStyle={{ padding: 0 }}
        title={null}
        visible={app.preview}
        onCancel={() => {
          update(dispatch)({ ...app, preview: false });
        }}
        width={375}
        footer={null}
      >
        <div style={{ height: 667, overflowY: 'scroll' }}>
          <Renderer isDesign={false} item={app} isTop={true} />
        </div>
      </Modal>
    </div>
  );
}
