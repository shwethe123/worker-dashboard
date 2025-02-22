
import { Layout, Card, Statistic, Row, Col, Button, DatePicker, Flex, Progress, Typography, Slider } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import React from 'react';

const { Content } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [stepsCount, setStepsCount] = React.useState(5);
  const [stepsGap, setStepsGap] = React.useState(7);
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
          <div className='mt-5 mb-5 bg-white'>
            <div>
              <Typography.Title level={5}>Custom count:</Typography.Title>
              <Slider min={2} max={10} value={stepsCount} onChange={setStepsCount} />
              <Typography.Title level={5}>Custom gap:</Typography.Title>
              <Slider step={4} min={0} max={40} value={stepsGap} onChange={setStepsGap} />
              <Flex
                wrap
                gap="middle"
                style={{
                  marginTop: 16,
                }}
              >
                <Progress
                  type="dashboard"
                  steps={8}
                  percent={50}
                  trailColor="rgba(0, 0, 0, 0.06)"
                  strokeWidth={20}
                />
                <Progress
                  type="circle"
                  percent={100}
                  steps={{
                    count: stepsCount,
                    gap: stepsGap,
                  }}
                  trailColor="rgba(0, 0, 0, 0.06)"
                  strokeWidth={20}
                />
              </Flex>
            </div>
                <div>
                <Flex gap="small" wrap>
                  <Progress type="circle" percent={75} />
                  <Progress type="circle" percent={70} status="exception" />
                  <Progress type="circle" percent={100} />
                </Flex>
                </div>
          </div>
          
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
      </Layout>
  );
};

export default Dashboard;
