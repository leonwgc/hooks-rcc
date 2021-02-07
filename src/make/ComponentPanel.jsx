import React, { useReducer } from 'react';
import { Tabs } from 'antd';
import ComponentSelectList from './ComponentSelectList';
import components, { antdComponents } from './components/index';
import TplSelectList from './TplSelectList';
import './ComponentPanel.less';
const { TabPane } = Tabs;

const ComponentPanel = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 1);

  return (
    <div className="component-panel">
      <Tabs
        type="line"
        onChange={(k) => {
          if (k === '2') {
            forceUpdate();
          }
        }}
      >
        <TabPane tab="基础组件" key="0">
          <ComponentSelectList components={components} />
        </TabPane>
        <TabPane tab="蚂蚁组件" key="1">
          <ComponentSelectList components={antdComponents} />
        </TabPane>
        <TabPane tab="模板" key="2">
          <TplSelectList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentPanel;
