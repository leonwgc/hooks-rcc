import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './Renderer.less';

const Renderer = ({ item, isDesign = false, onRemove }) => {
  const app = useSelector((state) => state.app);
  const { comps = [] } = item;

  if ((!app && isDesign) || !comps.length) {
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

  const renderItem = (item) => {
    return React.createElement(item.type, {
      ...item.props,
      style: item.style,
      isDesign,
      item,
      ...getEventProps(item),
    });
  };

  const renderComp = (comp) => {
    return isDesign ? (
      <li className={`design-cmp`} data-id={comp.id} key={comp.id}>
        <div
          className={classnames({
            mask: true,
            active: app.activeComp === comp.id,
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
