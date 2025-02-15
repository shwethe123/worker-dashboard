import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Dashboard from './conpomnent/Dashboard';
import TestTable from "./conpomnent/Test_table";

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1); // key is a string: "1", "2", "3"
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: key === "1" ? "Sell All" : `subnav ${key}`, // Compare with "1" (string)
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: subKey === 1 ? "Overview" : subKey === 2 ? "ဆိုင်(၁)" : `option${subKey}`,
      };
    }),
  };
});

const App = () => {
  const [selectedContent, setSelectedContent] = useState('Content 1'); // State to track content

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to handle menu item click and update the content
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      setSelectedContent('Content 1');
    } else if (e.key === '2') {
      setSelectedContent('Content 2');
    } else if (e.key === '3') {
      setSelectedContent('Content 3');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          onClick={handleMenuClick} // Handle clicks here
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={handleMenuClick} // Handle clicks here
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
            height: '100%',
          }}
        >
          {/* <Breadcrumb
            items={[
              {
                title: <a href="/home">Home</a>,
              },
              {
                title: <a href="/list">List</a>,
              },
              {
                title: <a href="/app">App</a>,
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          /> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
            }}
          >
            {/* Display content based on the selected option */}
            {selectedContent === 'Content 1' && <div><Dashboard/></div>}
            {selectedContent === 'Content 2' && <div><TestTable/></div>}
            {selectedContent === 'Content 3' && <div>Content 3</div>}
            {selectedContent === 'Content 4' && <div>Content 4</div>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
