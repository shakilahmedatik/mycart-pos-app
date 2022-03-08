import React, { useEffect, useState } from 'react'
import '../assets/styles/layout.css'
import { Layout, Menu, Spin } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CopyOutlined,
  LogoutOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const { Header, Sider, Content } = Layout

const DefaultLayout = ({ children }) => {
  const { cartItems, loading } = useSelector(state => state.rootReducer)
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const [isCollapsed, setISCollapsed] = useState(false)
  const toggle = () => setISCollapsed(!isCollapsed)
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 15,
          top: 13,
          bottom: 0,
          transition: 'all 0.3s ease-out',
        }}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
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
      <Layout
        className='site-layout'
        style={
          isCollapsed
            ? { marginLeft: 80, transition: 'all 0.3s ease-out' }
            : { marginLeft: 200, transition: 'all 0.3s ease-out' }
        }
      >
        <Header className='site-layout-background' style={{ padding: 10 }}>
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
          <div
            onClick={() => navigate('/cart')}
            className='cart-count d-flex align-items-center'
          >
            <ShoppingCartOutlined />
            <b>
              <p>{cartItems.length}</p>
            </b>
          </div>
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
          {loading && (
            <div className='d-flex h-100 justify-content-center align-items-center'>
              <Spin size='large' />
            </div>
          )}
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
