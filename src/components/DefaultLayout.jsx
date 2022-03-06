import React, { useState } from 'react'
import '../assets/styles/layout.css'

import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CopyOutlined,
  LogoutOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const DefaultLayout = ({ children }) => {
  const [isCollapsed, setISCollapsed] = useState(false)
  const toggle = () => setISCollapsed(!isCollapsed)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={isCollapsed}>
        <div className='logo'>
          <h3>Cart POS</h3>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key='/home' icon={<HomeOutlined />}>
            <Link to='/home'>Home</Link>
          </Menu.Item>
          <Menu.Item key='/bills' icon={<CopyOutlined />}>
            <Link to='/bills'>Bills</Link>
          </Menu.Item>
          <Menu.Item key='/items' icon={<UnorderedListOutlined />}>
            <Link to='/items'>items</Link>
          </Menu.Item>
          <Menu.Item key='/customers' icon={<UserOutlined />}>
            <Link to='/customers'>Customers</Link>
          </Menu.Item>
          <Menu.Item key='/logout' icon={<LogoutOutlined />}>
            <Link to='/logout'>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 10 }}>
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '10px 10px 0 10px',
            padding: 24,
            minHeight: 280,
            borderRadius: '10px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
