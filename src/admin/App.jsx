import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import IconFont from '~/common/IconFont';
import Header from './Header';
import menus from './menus';
import './App.less';

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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMenuAllUnFold, setIsMenuAllUnFold] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  const toggleMenusFoldState = () => {
    setIsMenuAllUnFold((i) => !i);
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

        <Menu theme={theme} mode={'inline'} openKeys={openKeys} onOpenChange={setOpenKeys}>
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
        <Content style={{ padding: 20 }}>Bill is a cat.</Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design </Footer>
      </Layout>
    </Layout>
  );
};

export default hot(App);
