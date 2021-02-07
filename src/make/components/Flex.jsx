import React, { useEffect, useRef } from 'react';
import { gid, getSettingDefaultValues } from '~/make/helper';
import Sortable from 'sortablejs';
import Renderer from '../Renderer';
import classnames from 'classnames';
import { getConfigById } from './index';
import useUpdateStore from '../hooks/useUpdateStore';

const Flex = ({ item = {}, isDesign = false, style = {} }) => {
  const ref = useRef(null);
  let data = item.comps || [];
  let newAddedComponent = null;
  const updateStore = useUpdateStore();

  const updateData = (data) => {
    item.comps = data;
    updateStore({ activeComp: null });
  };

  useEffect(() => {
    if (isDesign) {
      let s1 = Sortable.create(ref.current, {
        group: {
          name: gid(),
          put: ['cmp'],
        },
        onAdd(e) {
          let cid = e.item.dataset.cid;
          let tpl = e.item.dataset.tpl || '';
          e.item.style.display = 'none';

          newAddedComponent = {
            cid,
            index: e.newIndex,
            dom: e.item,
            tpl,
          };
        },
        store: {
          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           */
          set: function (s) {
            if (newAddedComponent) {
              const { index, dom, cid, tpl } = newAddedComponent;
              dom.remove();

              const cfg = getConfigById(cid);
              const { props = {}, style = {} } = cfg.setting;
              const defaultProps = getSettingDefaultValues(props);
              const defaultStyles = getSettingDefaultValues(style);

              const cmp = {
                cid: cid,
                id: [cid, '-', gid()].join(''),
                props: { ...defaultProps },
                style: { ...defaultStyles },
                tpl,
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
    const onClick = (e) => {
      const li = e.target.parentElement;

      if (li.classList.contains('design-cmp')) {
        updateStore({ activeComp: li.dataset.id });
      } else {
        if (e.target === ref.current) {
          updateStore({ activeComp: null });
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

  const _style = {
    display: 'flex',
    width: '100%',
  };

  return (
    <div style={{ ..._style, ...style }} ref={ref}>
      <Renderer isDesign={isDesign} onRemove={isDesign ? onRemove : null} item={item} />
    </div>
  );
};

export default Flex;
