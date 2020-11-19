import React, { Suspense, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HashRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import routes from './routes';
import { Spin } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import IconFont from '~/admin/common/IconFont';
import Header from './Header';
import menus from './menus';
import './Layout.less';
import PageLoading from '../common/PageLoading';
import PageNotFound from '../PageNotFound';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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

export default function LayoutIndex() {
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

  const menuRender = (menus) => {
    return menus.map((item) => {
      if (!item.childs) {
        return <Menu.Item key={item.id}>{item.funTitle}</Menu.Item>;
      } else {
        return (
          <SubMenu
            key={item.id}
            title={item.funTitle}
            icon={
              item.funLogo ? (
                <IconFont
                  style={{ fontSize: 16, color: iconFontColor }}
                  type={`icon-${item.funLogo}`}
                />
              ) : (
                <UnorderedListOutlined />
              )
            }
          >
            {menuRender(item.childs)}
          </SubMenu>
        );
      }
    });
  };

  return (
    <Layout className="site-layout">
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed((c) => !c)}
      >
        <div class="sidebar-logo-container">
          <div className="logo"></div>
        </div>
        {collapsed ? null : (
          <div className="fold-menues">
            <span onClick={toggleMenusFoldState}>{isMenuAllUnFold ? '收起' : '展开'}全部菜单</span>
          </div>
        )}

        <Menu
          theme={theme}
          mode={'inline'}
          onClick={onSelect}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        >
          {menuRender(menus)}
        </Menu>
      </Sider>
      <Layout className="page-layout">
        <Header />
        <Content style={{ padding: 20 }}>
          <Router>
            <Suspense fallback={<PageLoading />}>
              <Switch>
                {routes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
                <Route component={PageNotFound}></Route>
              </Switch>
            </Suspense>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design </Footer>
      </Layout>
    </Layout>
  );
}
