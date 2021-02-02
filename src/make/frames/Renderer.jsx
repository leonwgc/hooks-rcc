import React from 'react';
import * as antd from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FlexContainer from '../containers/FlexContainer';
import custom from '../custom-components';
import './Renderer.less';

antd['CheckboxGroup'] = Checkbox.Group;
const allComponents = { ...antd, ...custom };

const Renderer = ({ item, isDesign = false, onRemove, isTop = false }) => {
  const app = useSelector((state) => state.app);
  const { comps = [] } = item;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  if (!comps.length) {
    return null;
  }

  const getEventProps = (item) => {
    const props = Object.keys(item.props);
    let eventProps = {};
    const handlers = props.filter((p) => p.startsWith('on'));
    if (handlers) {
      for (let p of handlers) {
        if (item.props[p]) {
          try {
            eventProps[p] = new Function('e', item.props[p]);
          } catch (ex) {
            /**/
          }
        }
      }
    }
    return eventProps;
  };

  // get Select/Checkbox options
  const getOptions = (item) => {
    const { optionLabels = [], optionValues = [] } = item.props;
    const options = [];
    if (optionLabels.length === optionValues.length) {
      optionLabels.map((option, idx) => {
        options.push({
          label: option,
          value: optionValues[idx],
        });
      });
    }
    return options;
  };

  const renderItem = (item) => {
    let type = allComponents[item.type] || item.type;

    const isFlex = item.type == 'Flex';

    if (!isFlex) {
      const events = getEventProps(item);
      const props = {
        ...item.props,
        style: { ...item.styles },
        isDesign,
        ...events,
      };
      if (item.type in antd) {
        const { name, label, ...rest } = props;
        if (['Select', 'CheckboxGroup'].indexOf(item.type) > -1) {
          rest.options = getOptions(item);
        }

        return (
          <Form.Item name={name} label={label}>
            {React.createElement(type, rest)}
          </Form.Item>
        );
      } else {
        return React.createElement(type, props);
      }
    } else {
      const props = {
        ...item.props,
        style: { ...item.styles },
        isDesign,
      };
      return <FlexContainer {...props} item={item} />;
    }
  };

  const renderComp = (comp) => {
    return isDesign ? (
      <li className={`cmp design`} data-id={comp.id} key={comp.id}>
        <div
          className={`mask ${app.activeComp === comp.id ? 'active' : ''} ${
            comp.type == 'Flex' ? 'flex' : ''
          }`}
        ></div>
        <DeleteOutlined className="delete" onClick={onRemove} />
        {renderItem(comp)}
      </li>
    ) : (
      renderItem(comp)
    );
  };

  const render = () => {
    return comps.map(renderComp);
  };

  return isTop ? (
    <Form onFinish={onFinish} form={form}>
      {render()}
    </Form>
  ) : (
    render()
  );
};

export default Renderer;