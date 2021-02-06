import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { Tabs } from 'antd';
import components, { antdComponents } from './components/index';
import './ComponentPanel.less';

const { TabPane } = Tabs;

const ComponentPanel = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  // const [key, setKey] = useState('1');

  useEffect(() => {
    let s1 = Sortable.create(ref.current, {
      sort: false,
      group: {
        name: 'cmp',
        pull: 'clone',
      },
    });
    let s2 = Sortable.create(ref1.current, {
      sort: false,
      group: {
        name: 'cmp',
        pull: 'clone',
      },
    });
    return () => {
      s1.destroy();
      s2.destroy();
    };
  }, []);

  // const list = [
  //   { name: '基础组件', comps: components, ref: ref },
  //   { name: '蚂蚁组件', comps: antdComponents, ref: ref1 },
  // ];

  // const TabPane = React.forwardRef((props, ref) => {
  //   // const item = props.item;
  //   const { item = {}, ...rest } = props;
  //   return (
  //     <TabPane tab={item.name} {...rest}>
  //       <ul ref={ref}>
  //         {item.comps.map((c) => (
  //           <li key={c.id} data-id={c.id} className="cmp panel-cmp">
  //             {c.designRender()}
  //           </li>
  //         ))}
  //       </ul>
  //     </TabPane>
  //   );
  // });

  return (
    <div className="component-panel">
      <Tabs type="line" size="large" defaultActiveKey="1">
        <TabPane tab="基础组件" key="1" forceRender={true}>
          <ul ref={ref}>
            {components.map((item, idx) => (
              <li key={idx} data-cid={item.id} className="cmp panel-cmp">
                {item.designRender()}
              </li>
            ))}
          </ul>
        </TabPane>
        <TabPane tab="蚂蚁组件" key="2" forceRender={true}>
          <ul ref={ref1}>
            <li data-id="Product" className="cmp panel-cmp">
              Product
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentPanel;
