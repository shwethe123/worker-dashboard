import React from 'react';
import { ConfigProvider, Flex, Popconfirm } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import CreateForm from '../Create/Create'


const text = 'Are you sure to delete this task?';
const description = <CreateForm/>;
const App = () => (
  <ConfigProvider
  >
        <Flex align="center" vertical>
          <Popconfirm
            placement="leftTop"
            title={text}
            description={description}
          >
            <MoreOutlined className='font-bold hover:bg-blue-50 p-2 rounded-full'/>
          </Popconfirm>
        </Flex>
  </ConfigProvider>
);
export default App;