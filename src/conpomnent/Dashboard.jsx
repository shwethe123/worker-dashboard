
import { Layout, Menu, Breadcrumb, Card, Statistic, Row, Col, Button, DatePicker } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingFilled } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>Analytics</Menu.Item>
          <Menu.Item key="3" icon={<NotificationOutlined />}>Notifications</Menu.Item>
          <Menu.Item key="4" icon={<SettingFilled/>}>Setting</Menu.Item>
        </Menu>
      </Sider>  
      <Layout style={{ padding: '0 24px 24px' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h2 style={{ color: 'white', paddingLeft: '20px' }}>My Dashboard</h2>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Total Sales" bordered={false}>
                <Statistic
                  title="Sales"
                  value={112893}
                  prefix="$"
                  suffix="USD"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Users" bordered={false}>
                <Statistic
                  title="Users"
                  value={230}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Progress" bordered={false}>
                <Statistic
                  title="Progress"
                  value={65}
                  precision={2}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={12}>
              <Card title="Date Range" bordered={false}>
                <RangePicker style={{ width: '100%' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Notifications" bordered={false}>
                <Button type="primary" style={{ width: '100%' }}>View Notifications</Button>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design Dashboard ©2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
