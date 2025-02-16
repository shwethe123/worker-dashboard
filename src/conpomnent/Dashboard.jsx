
import { Layout, Menu, Breadcrumb, Card, Statistic, Row, Col, Button, DatePicker, Segmented } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingFilled } from '@ant-design/icons';
import OverView from '../page/OverView/OverView';
import Statements from '../page/Statements/Statements';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [selectContent, setSelectContent] = useState('OverView');

  return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            // padding: 24,
            margin: 0,
          }}
        >
          <div className='mb-5 mt-5'>
          <Segmented
              options={['OverView', 'Statements', 'Monthly', 'Quarterly', 'Yearly']}
              onChange={(value) => {
                setSelectContent(value);
                console.log(value);
              }}
            />
          </div>
        </Content>
        <div>
          {selectContent === 'OverView' && <div><OverView/></div>}
          {selectContent === 'Statements' && <div><Statements/></div>}
        </div>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design Dashboard ©2025
        </Footer>
      </Layout>
  );
};

export default Dashboard;
