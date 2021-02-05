import React, { useEffect, uesState } from 'react';
import { Form, Tabs } from 'antd';
import config from './components-config';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './stores/actions';
import FormRenderer from '~/common-pc/FormRenderer';
import './SettingPanel.less';

const { TabPane } = Tabs;

function SettingPanel() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  useEffect(() => {
    if (app.activeComp) {
      form.resetFields();
    }
  }, [app.activeComp]);

  if (!app.activeComp) {
    return <div className="prop-setting mini"></div>;
  }

  let comp = app.comps.filter((c) => c.id === app.activeComp)[0];

  if (!comp) {
    let flexArray = app.comps.filter((c) => c.type === 'Flex');
    let current;
    for (var i = 0; i < flexArray.length; i++) {
      current = flexArray[i];
      if (current.id === app.activeComp) {
        comp = current;
        break;
      } else {
        comp = current.comps.filter((c) => c.id === app.activeComp)[0];
        if (comp) {
          break;
        }
        let subFlexs = current.comps.filter((c) => c.type === 'Flex');
        flexArray = flexArray.concat(subFlexs);
      }
    }
  }

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

    update(dispatch)({ comps: app.comps });
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
    <div className="prop-setting" key={app.activeComp}>
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
