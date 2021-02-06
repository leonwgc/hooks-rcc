import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import Flex from './components/Flex';
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
    const isFlex = item.cid == 'Flex';

    let props = {
      ...item.props,
      style: item.style,
      isDesign,
    };

    if (!isFlex) {
      const events = getEventProps(item);
      props = { ...props, ...events };
      return React.createElement(item.type, props);
    } else {
      return <Flex {...props} item={item} />;
    }
  };

  const renderComp = (comp) => {
    return isDesign ? (
      <li className={`design-cmp`} data-id={comp.id} key={comp.id}>
        <div
          className={`mask ${app.activeComp === comp.id ? 'active' : ''} ${
            comp.type == 'Flex' ? 'flex' : ''
          }`}
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
