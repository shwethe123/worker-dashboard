
import { Layout, Segmented } from 'antd';
import OverView from '../pages/over_view/OverView'

const { Content, Footer } = Layout;

const Dashboard = () => {
  return (
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
            <Segmented
              options={['OverView', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
              onChange={(value) => {
                console.log(value);
              }}
            />
          
        <div>
          <OverView/>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design Dashboard ©2025
        </Footer>
      </Layout>
  );
};

export default Dashboard;
