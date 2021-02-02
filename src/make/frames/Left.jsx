import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { Tabs } from 'antd';
import config from '../config';
import './Left.less';

const { TabPane } = Tabs;

const App = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const [key, setKey] = useState('1');

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

  const baseComponents = Object.keys(config).filter((item) => item != 'Flex');

  return (
    <>
      <Tabs type="line" size="large" activeKey={key} onChange={setKey}>
        <TabPane tab="基础组件" key="1" forceRender={true}>
          <ul ref={ref}>
            <li data-id="Flex" className="cmp flex">
              Flex Container
            </li>
            {/* <li data-id="Flex" className="cmp flex">
              Flex Container
            </li>
            <li data-id="Button" className="cmp">
              Button
            </li>
            <li data-id="Input" className="cmp">
              Input
            </li>
            <li data-id="Select" className="cmp">
              Select
            </li>
            <li data-id="img" className="cmp">
              Image
            </li> */}
            {baseComponents.map((item) => (
              <li key={item} data-id={item} className="cmp">
                {item}
              </li>
            ))}
          </ul>
        </TabPane>
        <TabPane tab="自定义组件" key="2" forceRender={true}>
          <ul ref={ref1}>
            <li data-id="Product" className="cmp">
              Product
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </>
  );
};

export default App;
