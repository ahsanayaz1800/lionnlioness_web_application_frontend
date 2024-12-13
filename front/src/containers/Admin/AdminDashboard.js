import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import UsersList from './AdminUsers'; // Import the UsersList component
import PackagesPlan from './AdminPlan';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1'); // Track which menu item is selected
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    
    // Clear cache
    if ('caches' in window) {
      try {
        const cacheKeys = await caches.keys();
        cacheKeys.forEach(async (key) => {
          await caches.delete(key); // Delete each cache key
        });
        console.log('Cache cleared successfully');
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }

    // Redirect to the login page
    window.location.href = '/admin/login';
  };


  // Function to render content based on the selected menu
  const renderContent = () => {
    switch (selectedMenuKey) {
      case '1':
        return <UsersList />; // Display UsersList component
      case '2':
        return <PackagesPlan />; // Display PackagesPlan component
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            if (key === '3') {
              handleLogout(); // Call handleLogout when "Logout" is clicked
            } else {
              setSelectedMenuKey(key); // Update state when a menu item is clicked
            }
          }}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Manage Users',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Manage Plans',
            },
            {
              key: '3',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            height: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Render the content based on the selected menu item */}
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
