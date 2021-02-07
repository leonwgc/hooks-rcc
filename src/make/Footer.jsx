import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Space, Form, Input, message } from 'antd';
import useUpdateStore from './hooks/useUpdateStore';
import FormRenderer from '~/common-pc/FormRenderer';
import { gid } from './helper';
import Renderer from './Renderer';
import * as storage from './storage';
import './Footer.less';

export default function Footer() {
  const app = useSelector((state) => state.app);
  const [form] = Form.useForm();
  const updateStore = useUpdateStore();

  const onPreview = () => {
    updateStore({ preview: true });
  };

  const onClear = () => {
    updateStore({ comps: [], activeComp: null });
  };

  const saveAsTpl = (formData) => {
    storage.addTpl({
      comps: app.comps,
      ...formData,
      tid: gid(),
    });
    updateStore({ showTplDlg: false, _f: Math.random() });
    form.resetFields();
    message.success('保存成功');
  };

  const tplFormLayout = [
    {
      type: Input,
      label: '模板名称',
      placeholder: '请输入',
      name: 'name',
    },
    {
      type: Input.TextArea,
      label: '描述',
      placeholder: '请输入',
      name: 'desc',
    },
  ];

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
          <Button type="primary" onClick={() => updateStore({ showTplDlg: true })}>
            保存为模板
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
      <Modal
        title={'保存模板'}
        visible={app.showTplDlg}
        onCancel={() => {
          updateStore({ showTplDlg: false });
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={saveAsTpl} layout="vertical">
          <FormRenderer layoutData={tplFormLayout}></FormRenderer>
        </Form>
      </Modal>
    </div>
  );
}
