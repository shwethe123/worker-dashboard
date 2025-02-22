
import { Layout, Card, Statistic, Row, Col, Button, DatePicker, Flex, Progress, Typography, Slider } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import List from './List';
import CreateForm from '../Create/Create'

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  return (
      <Layout style={{}}>
        <Content
        className='pt-5'
          style={{
            // padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          
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
          <Row gutter={16} className='mt-5 mb-5 bg-white'>
            <Col span={12}>
              <List/>
            </Col>
            <Col span={12}>
              <List/> 
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
          <CreateForm/>
        </Content>
      </Layout>
  );
};

export default Dashboard;
