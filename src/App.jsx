import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import Dashboard from './pages/over_view/OverView';
import WorkerTable from './conpomnent/Worker_Table';
import FormPicker from './pages/FormPicker/FormPicker';
import { PureContent } from 'antd/es/message/PurePanel';
// import Fixer from './pages/Fixer/Fixer';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('OverView', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('User List', '3'),
    getItem('Form Picker', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '7'), getItem('Team 2', '9')]),
  getItem('Files', '10', <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState('1'); // Default to 'Option 1'
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedContent(e.key); // Update the selected content key
  };

  // Function to get the breadcrumb items based on the selected key
  const getBreadcrumbItems = () => {
    const findItem = (items, key) => {
      for (const item of items) {
        if (item.key === key) {
          return item;
        }
        if (item.children) {
          const found = findItem(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const selectedItem = findItem(items, selectedContent);
    if (!selectedItem) return [<Breadcrumb.Item key="home">Home</Breadcrumb.Item>];

    const breadcrumbItems = [<Breadcrumb.Item key="home">Home</Breadcrumb.Item>];
    if (selectedItem) {
      breadcrumbItems.push(<Breadcrumb.Item key={selectedItem.key}>{selectedItem.label}</Breadcrumb.Item>);
    }

    return breadcrumbItems;
  };

  // Function to render the content based on the selected key
  const renderContent = () => {
    switch (selectedContent) {
      case '1':
        return <Dashboard />;
      case '2':
        return <div>Content for Option 2</div>;
      case '3':
        return <WorkerTable/>;
      case '4':
        return <FormPicker/>;
      case '5':
        return <div>Content for Alex</div>;
      case '6':
        return <div>Content for Team 1</div>;
      case '8':
        return <div>Content for Team 2</div>;
      case '9':
        return <div>Content for Files</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          onClick={handleMenuClick}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className='h-screen overflow-auto'>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <PureContent style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {getBreadcrumbItems()}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </PureContent>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;