import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { getConfigById } from './components/index';
import './Renderer.less';

const getEventProps = (item) => {
  const props = Object.keys(item.props);
  let eventProps = {};
  const handlers = props.filter((p) => p.startsWith('on'));

  if (handlers.length) {
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

const Renderer = ({ item = {}, isDesign = false, onRemove }) => {
  const { comps = [] } = item;

  if (!comps.length) {
    return null;
  }

  const renderItem = (item) => {
    let { type } = item;
    if (!type) {
      type = getConfigById(item.cid).type;
    }

    // flex also act as tpl wrapper
    const _isDesign = item.tpl ? false : isDesign;

    return React.createElement(type, {
      ...item.props,
      style: item.style,
      isDesign: _isDesign,
      item: item.tpl ? (typeof item.tpl === 'string' ? JSON.parse(item.tpl) : item.tpl) : item,
      ...getEventProps(item),
    });
  };

  const renderComp = (comp) => {
    return isDesign ? (
      <li className={`design-cmp`} data-id={comp.id} key={comp.id}>
        <div
          className={classnames({
            mask: true,
            flex: comp.cid == 'Flex',
          })}
        ></div>
        <div className="edit">
          <DeleteOutlined onClick={onRemove} style={{ color: '#fff' }} />
        </div>
        {renderItem(comp)}
      </li>
    ) : (
      renderItem(comp)
    );
  };

  return comps.map(renderComp);
};

export default Renderer;
