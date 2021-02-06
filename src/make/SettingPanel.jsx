import React, { useEffect } from 'react';
import { Form, Tabs } from 'antd';
import config from './components-config';
import FormRenderer from '~/common-pc/FormRenderer';
import useSelectedComponent from './hooks/useSelectedComponent';
import useUpdateStore from './hooks/useUpdateStore';
import './SettingPanel.less';

const { TabPane } = Tabs;

function SettingPanel() {
  const [form] = Form.useForm();
  const comp = useSelectedComponent();
  const updateStore = useUpdateStore();

  useEffect(() => {
    if (comp) {
      form.resetFields();
    }
  }, [comp]);

  if (!comp) {
    return <div className="prop-setting mini"></div>;
  }

  const initValues = {};
  const keys = Object.keys(comp.props);

  for (let k of keys) {
    initValues[k] = comp.props[k];
  }

  const styleKeys = Object.keys(comp.styles);
  for (let k of styleKeys) {
    initValues[k] = comp.styles[k];
  }

  const onValuesChange = (changedValues) => {
    let ckeys = Object.keys(changedValues);
    for (let k of ckeys) {
      if (keys.includes(k)) {
        comp.props[k] = changedValues[k];
      } else {
        comp.styles[k] = changedValues[k];
      }
    }

    updateStore();
  };

  const props = config[comp.type].props;
  const propFields = Object.keys(props);

  const styles = config[comp.type].styles || {};
  const styleFields = Object.keys(styles);

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
      ...styles[key],
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
        <Tabs type="line" size="large">
          <TabPane tab="属性设置" key="1">
            <FormRenderer layoutData={propsLayoutData}></FormRenderer>
          </TabPane>
          <TabPane tab="样式设置" key="2">
            <FormRenderer layoutData={styleLayoutData}></FormRenderer>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
}

export default SettingPanel;
