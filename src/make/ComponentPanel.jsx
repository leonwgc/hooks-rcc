import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import ComponentSelectList from './ComponentSelectList';
import components, { antdComponents } from './components/index';
import TplSelectList from './TplSelectList';
import ErrorBoundary from './ErrorBoundary';
import './ComponentPanel.less';
const { TabPane } = Tabs;

const ComponentPanel = () => {
  const app = useSelector((state) => state.app);

  return (
    <div className="component-panel">
      <Tabs type="line">
        <TabPane tab="基础组件" key="0">
          <ComponentSelectList components={components} />
        </TabPane>
        <TabPane tab="蚂蚁组件" key="1">
          <ComponentSelectList components={antdComponents} />
        </TabPane>
        <TabPane tab="模板" key="2">
          <ErrorBoundary>
            <TplSelectList />
          </ErrorBoundary>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentPanel;
