import { Layout, Card, Statistic, Row, Col, Button, DatePicker, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  return (
    <Layout className="">
      <Content className="">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Sales" bordered={false} className="shadow-lg">
              <Statistic title="Sales" value={112893} prefix="$" suffix="USD" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Users" bordered={false} className="shadow-lg">
              <Statistic title="Users" value={230} prefix={<UserOutlined />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Progress" bordered={false} className="shadow-lg">
              <Statistic title="Progress" value={65} precision={2} suffix="%" />
            </Card>
          </Col>
        </Row>

        {/* Second Row of Cards */}
        <Row gutter={16} className="mt-6">
          <Col span={12}>
            <Card title="Date Range" bordered={false} className="shadow-lg">
              <RangePicker className="w-full" />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Notifications" bordered={false} className="shadow-lg">
              <Button type="primary" className="w-full">View Notifications</Button>
            </Card>
          </Col>
        </Row>

        {/* Progress bars */}
        <div className="mt-6">
          <Row gutter={16} className="flex justify-between">
            <Col span={12} className="flex flex-col space-y-4">
              <Progress percent={30} />
              <Progress percent={50} status="active" />
              <Progress percent={70} status="exception" />
              <Progress percent={100} />
              <Progress percent={50} showInfo={false} />
            </Col>
            <Col span={12} className="flex justify-between space-x-4">
              <Progress type="circle" percent={75} />
              <Progress type="circle" percent={70} status="exception" />
              <Progress type="circle" percent={100} />
            </Col>
          </Row>
        </div>
      </Content>

      <Footer className="text-center py-4 bg-gray-100">
        Ant Design Dashboard ©2025
      </Footer>
    </Layout>
  );
};

export default Dashboard;
