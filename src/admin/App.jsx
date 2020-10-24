import { hot } from 'react-hot-loader/root';
import React, { Suspense, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import PageNotFound from '../h5/PageNotFound';
import routes from './routes';
import { Spin } from 'antd';
import 'dayjs/locale/zh-cn'; // load on demand
import dayjs from 'dayjs';
import './App.less';

import IconFont from '~/common/IconFont';
import Header from './Header';
import menus from './menus';
import './App.less';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

dayjs.locale('zh-cn');

const Loading = () => {
  return (
    <div className="my-loading">
      <Spin />
    </div>
  );
};

const parentMenusKeys = [];

function getParentMenus(arr) {
  for (let item of arr) {
    if (item.childs && !parentMenusKeys.includes(item.id)) {
      parentMenusKeys.push(item.id + '');
      getParentMenus(item.childs);
    }
  }
}

getParentMenus(menus);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMenuAllUnFold, setIsMenuAllUnFold] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  const history = useHistory();

  const toggleMenusFoldState = () => {
    setIsMenuAllUnFold((i) => !i);
  };

  const onSelect = ({ key, keyPath }) => {
    let item = null;
    if (keyPath.length === 1) {
      item = menus.filter((i) => i.id == key)[0];
    } else {
      let m = menus;
      var len = keyPath.length;
      keyPath = keyPath.reverse();
      for (var j = 0; j < len - 1; j++) {
        m = m.filter((i) => i.id == keyPath[j])[0].childs;
      }
      item = m.filter((i) => i.id == key)[0];
    }
    history.push(item.funUrl);
  };

  useEffect(() => {
    if (isMenuAllUnFold) {
      setOpenKeys(parentMenusKeys);
    } else {
      setOpenKeys([]);
    }
  }, [isMenuAllUnFold]);

  const iconFontColor = theme === 'dark' ? '#fff' : '#004BC';

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="site-layout">
        <Sider
          theme={theme}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed((c) => !c)}
        >
          <div className="logo" />
          {collapsed ? null : (
            <div className="fold-menues">
              <span onClick={toggleMenusFoldState}>展开全部菜单</span>
            </div>
          )}

          <Menu
            theme={theme}
            mode={'inline'}
            onClick={onSelect}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
          >
            {menus.map((item) => {
              if (item.funUrl || !item.childs) {
                return (
                  <Menu.Item
                    key={item.id}
                    onClick={null}
                    icon={
                      item.funLogo ? (
                        <IconFont
                          style={{ fontSize: 16, color: iconFontColor }}
                          type={`icon-${item.funLogo}`}
                        />
                      ) : null
                    }
                  >
                    {item.funTitle}
                  </Menu.Item>
                );
              } else {
                // has childs
                if (Array.isArray(item.childs)) {
                  return (
                    <SubMenu
                      key={item.id}
                      title={item.funTitle}
                      icon={
                        <IconFont
                          style={{ fontSize: 16, color: iconFontColor }}
                          type={`icon-${item.funLogo ? item.funLogo : 'tmemail'}`}
                        />
                      }
                    >
                      {item.childs.map((subItem) => {
                        return (
                          <Menu.Item key={subItem.id} onClick={null}>
                            {subItem.funTitle}
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                }
              }
            })}
          </Menu>
        </Sider>
        <Layout className="right-layout">
          <Header />
          <Content style={{ padding: 20 }}>
            <Router>
              <Suspense fallback={<Loading />}>
                <Switch>
                  {routes.map((route, idx) => (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                  <Route component={PageNotFound} />
                </Switch>
              </Suspense>
            </Router>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default hot(App);
