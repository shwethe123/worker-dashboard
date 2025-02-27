import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Input, Switch, Form, message } from 'antd';
import axios from 'axios';


const { Option } = Select;
const { TextArea } = Input;

const App = ({ setLeader, item }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [leader_approval, setLeader_approval] = useState("");
  const [textArea, setTextArea] = useState("");
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');


  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  useEffect(() => {
    console.log('Item:', item);
    if (item) {
      setLeader_approval(item.leader_approval);
    }
  }, [item]);

  const handleOk = async (values) => {
    console.log('Item:', item);
  
    if (!values.leader_approval && isSwitchOn && !values.textArea) {
      message.error('Item is missing or invalid');
      return; 
    } else if (!values.password) {
      message.error('Password is missing or invalid');
      return;
    }

  
    try {
      const addLeader = {
        leader_approval: values.leader_approval,
        password: values.password,
        textArea: isSwitchOn ? values.textArea : null,
      };
      console.log('Updated Leader Approval:', addLeader);
  
      const response = await axios.patch(`http://localhost:3000/api/worker_list/${item._id}`, addLeader);
      if (response.status === 200 || response.status === 201) {
        message.success('Leader approval updated successfully');
        setIsModalOpen(false);
        setLeader(false);
      } else {
        message.error('Failed to update leader approval');
      }
    } catch (error) {
      console.log('Error during form submission:', error);
      message.error('Validation failed or API call failed');
    }
  };

  const handleCancel = () => {
    setLeader(false);
    setIsModalOpen(false);
  };

  return (
    <Modal title="ခွင့်ပြုရန်" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <div
        className={`mt-4 bg-green-50 border-l-4 p-2 rounded-md
          ${item?.condition === 'ဝန်ထမ်းသစ်' ? 'border-orange-400 bg-orange-100 text-orange-600' : ''}
          ${item?.condition === 'အလုပ်နောက်ကျ' ? 'border-yellow-400 bg-yellow-100 text-yellow-600' : ''}
          ${item?.condition === 'ခွင့်တစ်ပိုင်း' ? 'border-green-400 bg-green-100 text-green-600' : ''}
          ${item?.condition === 'ခွင့်တစ်ရက်' ? 'border-indigo-400 bg-indigo-100 text-indigo-600' : ''}
          ${item?.condition === 'ခွင့်ရက်ရှည်' ? 'border-teal-400 bg-teal-100 text-teal-600' : ''}
          ${item?.condition === 'ခွင့်မဲ့' ? 'border-red-400 bg-red-100 text-red-600' : ''}
          ${item?.condition === 'ဖိုင်းအပြစ်ပေး' ? 'border-pink-400 bg-pink-100 text-pink-600' : ''}
          ${item?.condition === 'အလုပ်ထွက်မည့်သူ' ? 'border-purple-400 bg-purple-100 text-purple-600' : ''}
          ${item?.condition === 'အလုပ်ထွက်သူ' ? 'border-gray-400 bg-gray-100 text-gray-600' : ''}
          ${item?.condition === 'ကြိုတင်ခွင့်တိုင်သူ' ? 'border-blue-400 bg-blue-100 text-blue-600' : ''}
        `}
      >
        {item?.reason}
      </div>
      <Form className="mt-4" form={form} layout="vertical" onFinish={handleOk}>
        <Form.Item
          label="ခွင့်ပြုနိူင်သူများ"
          name="leader_approval"
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <Select
            name="leader_approval"
            value={leader_approval}
            onChange={setLeader_approval}
            style={{ width: 200 }}
            placeholder="Select an option">
            <Option value="AG187">AG187</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item label="အစားထိုးခွင့်ပြုမည်ဆိုပါက အကြောင်းပြချက်ရေးရန်" name="enableTextArea">
          <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
        </Form.Item>

        {isSwitchOn && (
          <Form.Item
            label="မိမိ ခွင့်ပြုနိူင်သူများအတွက် အကြောင်းပြချက်ရေးရန်"
            name="textArea"
            onChange={textArea}
            rules={[{ required: true, message: 'Please enter text' }]}
          >
            <TextArea rows={4} placeholder="Enter text here..." />
          </Form.Item>
        )}

        <div className="mt-4">
          <p className="bg-yellow-100 text-orange-500 p-2 rounded-full pl-2">
            - မိမိ AM or AG ရွေးထည်ရမည်။
          </p>
          <p className="bg-green-100 text-green-500 p-2 rounded-full pl-2">မိမိ Password ထည့်ရမည်။</p>
          <p className="bg-purple-100 text-purple-500 p-2 rounded-full pl-2">
            မိမိ ခွင့်ပြုမည့်သူ၏ သက်ဆိုင်သူ ခေါင်းဆောင်မရှိရှင် ခွင့်ပေးနိူင်သည်။
          </p>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Updated
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default App;