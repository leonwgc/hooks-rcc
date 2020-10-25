import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import './Header.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function PageHeader() {
  const [current, setCurrent] = useState('app');
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header className="page-header">
      <div className="content">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="app" icon={<GithubOutlined />}>
            Welcome leon
          </Menu.Item>

          <Menu.Item key="alipay">退出</Menu.Item>
        </Menu>
      </div>
    </Header>
  );
}
