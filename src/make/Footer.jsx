import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Space } from 'antd';
import useUpdateStore from './hooks/useUpdateStore';
import Renderer from './Renderer';
import './Footer.less';

export default function Footer() {
  const app = useSelector((state) => state.app);
  const updateStore = useUpdateStore();

  const onPreview = () => {
    updateStore({ preview: true });
  };

  const onClear = () => {
    updateStore({ comps: [], activeComp: null });
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
          updateStore({ preview: false });
        }}
        width={375}
        footer={null}
      >
        <div style={{ height: 667, overflowY: 'scroll' }} className="preview-box">
          <Renderer isDesign={false} item={app} />
        </div>
      </Modal>
    </div>
  );
}
