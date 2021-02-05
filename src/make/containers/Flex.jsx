import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gid } from '~/make/helper';
import { update } from '../stores/actions';
import Sortable from 'sortablejs';
import config from '../components-config';
import Renderer from '../Renderer';
import classnames from 'classnames';
import './Flex.less';

const Flex = ({ item = null, isDesign = false, style = {} }) => {
  const app = useSelector((state) => state.app);
  const ref = useRef(null);
  const dispatch = useDispatch();
  let data = item ? item.comps || [] : app.comps;
  let newAddedComponent = null;

  const updateData = (data) => {
    if (item) {
      item.comps = data;
      update(dispatch)({ comps: [...app.comps] });
    } else {
      update(dispatch)({ comps: [...data] });
    }
    update(dispatch)({ activeComp: null });
  };

  useEffect(() => {
    if (isDesign) {
      let s1 = Sortable.create(ref.current, {
        group: {
          name: gid() + '',
          put: ['cmp'],
        },
        onAdd(e) {
          let type = e.item.dataset.id;
          e.item.style.display = 'none';

          newAddedComponent = {
            id: type + '-' + gid(),
            type,
            index: e.newIndex,
            dom: e.item,
          };
        },
        store: {
          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           */
          set: function (s) {
            if (newAddedComponent) {
              const { id, index, type, dom } = newAddedComponent;
              dom.remove();

              let props = config[type].props;
              let fields = Object.keys(props);

              let styles = config[type].styles || {};
              let styleFields = Object.keys(styles);

              let defaultProps = {};
              let defaultStyles = {};

              for (let f of fields) {
                let dv = '';
                const { elProps = {} } = props[f];
                const { defaultValue } = elProps;
                if (typeof defaultValue === 'function') {
                  dv = defaultValue();
                } else {
                  dv = defaultValue;
                }
                defaultProps[f] = dv;
              }

              for (let sf of styleFields) {
                defaultStyles[sf] = styles[sf].defaultValue;
              }

              let cmp = {
                type,
                id,
                props: { key: id, ...defaultProps },
                styles: defaultStyles,
              };

              if (index == 0) {
                data.unshift(cmp);
              } else if (index === data.length) {
                data.push(cmp);
              } else {
                data.splice(index, 0, cmp);
              }
              newAddedComponent = null;
            } else {
              let ar = s.toArray();
              data.sort((a, b) => ar.indexOf(a.id) - ar.indexOf(b.id));
            }
            updateData(data);
          },
        },
      });
      return () => {
        s1.destroy();
      };
    }
  }, [data, updateData, isDesign]);

  useEffect(() => {
    const flex = ref.current;

    const onClick = (e) => {
      const li = e.target.parentElement;

      if (li.classList.contains('design-cmp')) {
        update(dispatch)({ activeComp: li.dataset.id });
      } else {
        if (e.target === flex) {
          update(dispatch)({ activeComp: null });
        }
      }
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  const onRemove = (e) => {
    let item = e.target.parentElement;
    while (item.nodeName !== 'LI') {
      item = item.parentElement;
    }

    if (item) {
      const id = item.dataset.id;
      data = data.filter((c) => c.id !== id);
      updateData(data);
    }
  };

  const isTopContainer = item === app;

  return (
    <div
      className={classnames({
        flex: !isTopContainer,
        stage: isDesign,
      })}
      style={style}
      ref={ref}
    >
      <Renderer isDesign={isDesign} onRemove={isDesign ? onRemove : null} item={item} />
    </div>
  );
};

export default Flex;
