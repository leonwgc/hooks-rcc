import React from 'react';
import { Tabs } from 'antd';
import ComponentSelectList from './ComponentSelectList';
import components, { antdComponents } from './components/index';
import './ComponentPanel.less';
const { TabPane } = Tabs;

const ComponentPanel = () => {
  return (
    <div className="component-panel">
      <Tabs type="line">
        <TabPane tab="基础组件">
          <ComponentSelectList components={components} />
        </TabPane>
        <TabPane tab="蚂蚁组件">
          <ComponentSelectList components={antdComponents} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentPanel;
