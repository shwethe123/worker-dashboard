import React, { useState } from 'react';
import { Button, Modal, Select, Input, Switch, Form, message } from 'antd'; // Import necessary components
const { Option } = Select;
const { TextArea } = Input;

const App = ({ setLeader,item }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false); // Switch state for showing TextArea
  const [selectedValue, setSelectedValue] = useState(""); // Select box value
  const [password, setPassword] = useState(""); // Password input state
  const [form] = Form.useForm(); // Initialize form

  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked); // Update the switch state
  };

  const handleOk = () => {
    // Submit the form if validation passes
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
        message.success('Form submitted successfully');
        setIsModalOpen(false);
        setLeader(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setLeader(false);
    setIsModalOpen(false);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value); // Update the selected value for select box
  };

  return (
    <Modal title="ခွင့်ပြုရန်" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={`mt-4 bg-green-50 border-l-4 p-2 rounded-md
                ${item.condition === 'ဝန်ထမ်းသစ်' ? 'border-orange-400 bg-orange-100 text-orange-600' : ''}
                ${item.condition === 'အလုပ်နောက်ကျ' ? 'border-yellow-400 bg-yellow-100 text-yellow-600' : ''}
                ${item.condition === 'ခွင့်တစ်ပိုင်း' ? 'border-green-400 bg-green-100 text-green-600' : ''}
                ${item.condition === 'ခွင့်တစ်ရက်' ? 'border-indigo-400 bg-indigo-100 text-indigo-600' : ''}
                ${item.condition === 'ခွင့်ရက်ရှည်' ? 'border-teal-400 bg-teal-100 text-teal-600' : ''}
                ${item.condition === 'ခွင့်မဲ့' ? 'border-red-400 bg-red-100 text-red-600' : ''}
                ${item.condition === 'ဖိုင်းအပြစ်ပေး' ? 'border-pink-400 bg-pink-100 text-pink-600' : ''}
                ${item.condition === 'အလုပ်ထွက်မည့်သူ' ? 'border-purple-400 bg-purple-100 text-purple-600' : ''}
                ${item.condition === 'အလုပ်ထွက်သူ' ? 'border-gray-400 bg-gray-100 text-gray-600' : ''}
                ${item.condition === 'ကြိုတင်ခွင့်တိုင်သူ' ? 'border-blue-400 bg-blue-100 text-blue-600' : ''}
            `}>
            {item.reason}
        </div>
      <Form className='mt-4' form={form} layout="vertical">
        <div>
          <Form.Item
            label="ခွင့်ပြုနိူင်သူများ"
            name="selectedValue"
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Select
              value={selectedValue}
              onChange={handleSelectChange}
              style={{ width: 200 }}
              placeholder="Select an option"
            >
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ marginTop: 20 }}>
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
        </div>

        <div style={{ marginTop: 20 }}>
          <Form.Item label="အစားထိုးခွင့်ပြုမည်ဆိုပါက အကြောင်းပြချက်ရေးရန်" name="enableTextArea">
            <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
          </Form.Item>
        </div>

        {isSwitchOn && (
          <div style={{ marginTop: 20 }}>
            <Form.Item
              label="မိမိ ခွင့်ပြုနိူင်သူများအတွက် အကြောင်းပြချက်ရေးရန်"
              name="textArea"
              rules={[{ required: true, message: 'Please enter text' }]}
            >
              <TextArea rows={4} placeholder="Enter text here..." />
            </Form.Item>
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <p>မိမိ AM or AG ရွေးထည်ရမည်။</p>
          <p>မိမိ Password ထည့်ရမည်။</p>
          <p>မိမိ ခွင့်ပြုမည့်သူ၏ သက်ဆိုင်သူ ခေါင်းဆောင်မရှိရှင် ခွင့်ပေးနိူင်သည်။</p>
        </div>
      </Form>
    </Modal>
  );
};

export default App;