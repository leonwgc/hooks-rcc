import React, { useEffect, useState } from 'react';
import { Form, Tabs } from 'antd';
import FormRenderer from '~/common-pc/FormRenderer';
import useSelectedComponent from './hooks/useSelectedComponent';
import useUpdateStore from './hooks/useUpdateStore';
import { getConfigById } from './components/index';
import './SettingPanel.less';

const { TabPane } = Tabs;

function SettingPanel() {
  const [form] = Form.useForm();
  const comp = useSelectedComponent();
  const updateStore = useUpdateStore();
  const [tab, setTab] = useState('0');
  const [hasProps, setHasProps] = useState(false);
  const [hasStyle, setHasStyle] = useState(false);

  useEffect(() => {
    if (comp) {
      form.resetFields();
      const { cid } = comp;
      const cfg = getConfigById(cid);
      let { style = {}, props = {} } = cfg.setting;
      const hasStyle = Object.keys(style).length;
      const hasProps = Object.keys(props).length;
      setHasProps(hasProps);
      setHasStyle(hasStyle);
      const tab = hasProps ? '0' : hasStyle ? '1' : '0';
      setTab(tab);
    }
  }, [comp]);

  if (!comp) {
    return <div className="prop-setting hide"></div>;
  }

  const initValues = { ...comp.props, ...comp.style };
  const { cid } = comp;
  const cfg = getConfigById(cid);
  let { props = {}, style = {} } = cfg.setting;
  const propFields = Object.keys(props);
  const styleFields = Object.keys(style);

  const onValuesChange = (changedValues) => {
    let ckeys = Object.keys(changedValues);
    let v;
    for (let k of ckeys) {
      v = changedValues[k];
      if (propFields.includes(k)) {
        comp.props = { ...comp.props, [k]: v };
      } else {
        comp.style = { ...comp.style, [k]: v };
      }
    }

    updateStore();
  };

  const propsLayoutData = [];
  const styleLayoutData = [];

  propFields.map((key) => {
    propsLayoutData.push({
      name: key,
      ...props[key],
    });
  });

  styleFields.map((key) => {
    styleLayoutData.push({
      name: key,
      ...style[key],
    });
  });

  return (
    <div className="prop-setting">
      <Form
        form={form}
        onValuesChange={onValuesChange}
        layout="vertical"
        initialValues={initValues}
      >
        <Tabs type="card" activeKey={tab} onChange={setTab}>
          {hasProps ? (
            <TabPane tab="属性设置" key="0">
              <FormRenderer layoutData={propsLayoutData}></FormRenderer>
            </TabPane>
          ) : null}
          {hasStyle ? (
            <TabPane tab="样式设置" key="1">
              <FormRenderer layoutData={styleLayoutData}></FormRenderer>
            </TabPane>
          ) : null}
        </Tabs>
      </Form>
    </div>
  );
}

export default SettingPanel;
