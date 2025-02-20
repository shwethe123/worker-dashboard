import { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import FormCreate from './Model'

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Button type="primary" onClick={() => setOpen(true)}>
        Create
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className='flex justify-between'>
          <div>
            <p>Hello</p>
          </div>
          <div>
            <FormCreate setOpen={setOpen}/>
          </div>
        </div>
      </Modal>
    </Flex>
  );
};
export default App;