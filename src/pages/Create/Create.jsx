import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Select, Space } from 'antd';
import FormCreate from './Model';

const { Option } = Select;
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button> */}
            {/* <Button onClick={onClose} type="primary">
              Submit
            </Button> */}
          </Space>
        }
      >
        <FormCreate onClose={onClose}/>
      </Drawer>
    </>
  );
};
export default App;