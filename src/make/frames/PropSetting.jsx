import React from 'react';
import {Form, Tooltip, Select, Tabs, Divider} from 'antd';
import config from '../config';
import * as antd from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {update} from '../stores/actions';
import {getEditComponentType, isValidDataType} from '~/make/helper';
import './PropSetting.less';

const {TabPane} = Tabs;

const FormItem = Form.Item;

function PropSetting() {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app);

  if (!app.activeComp) {
    return <div className="right mini"></div>;
  }

  let comp = app.comps.filter(c => c.id === app.activeComp)[0];

  if (!comp) {
    let flexArray = app.comps.filter(c => c.type === 'Flex');
    let current;
    for (var i = 0; i < flexArray.length; i++) {
      current = flexArray[i];
      if (current.id === app.activeComp) {
        comp = current;
        break;
      } else {
        comp = current.comps.filter(c => c.id === app.activeComp)[0];
        if (comp) {
          break;
        }
        let subFlexs = current.comps.filter(c => c.type === 'Flex');
        flexArray = flexArray.concat(subFlexs);
      }
    }
  }

  if (!comp) {
    return <div className="right mini"></div>;
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

  const onValuesChange = changedValues => {
    let ckeys = Object.keys(changedValues);
    for (let k of ckeys) {
      if (keys.includes(k)) {
        comp.props[k] = changedValues[k];
      } else {
        comp.styles[k] = changedValues[k];
      }
    }

    update(dispatch)({comps: app.comps});
  };

  const renderFormItem = (prop, config) => {
    const {type, label, tip, elProps = {}} = config;
    const props = {};
    if (type === 'boolean') {
      props['checked'] = initValues[prop];
    }

    if (type === 'enum') {
      const options = elProps.options;
      if (typeof options[0] === 'string') {
        elProps.options = options.map(str => ({label: str, value: str}));
      }
    }

    let editCompType;
    if (isValidDataType(type)) {
      editCompType = getEditComponentType(type);
    } else {
      editCompType = antd[type] || type;
    }

    return (
      <FormItem
        key={`${prop}`}
        name={prop}
        initialValue={elProps.defaultValue}
        label={label ? <Tooltip title={`${tip}`}>{label}</Tooltip> : null}>
        {React.createElement(
          editCompType,
          {...props, ...elProps},
          elProps.children
        )}
      </FormItem>
    );
  };

  let props = config[comp.type].props;
  let fields = Object.keys(props);

  let styles = config[comp.type].styles || {};
  let styleFields = Object.keys(styles);

  return (
    <div className="right">
      <Form
        onValuesChange={onValuesChange}
        key={comp.id}
        initialValues={initValues}>
        <Tabs type="line" size="large">
          <TabPane tab="属性设置" key="1">
            {fields.map(f => renderFormItem(f, props[f]))}
          </TabPane>
          <TabPane tab="样式设置" key="2">
            {styleFields.map(f => renderFormItem(f, styles[f]))}
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
}

export default PropSetting;
