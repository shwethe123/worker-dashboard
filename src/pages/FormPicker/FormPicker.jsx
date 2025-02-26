import { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import UserCard from './UserCard';
import axios from 'axios';

const { Option } = Select;
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    const { fileList } = info;
    setFileList(fileList);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [startDate, endDate] = values.time; // Destructure the date range
      const formattedValues = {
        ...values,
        startDate: startDate.format("YYYY-MM-DD HH:mm:ss"), // Format start date
        endDate: endDate.format("YYYY-MM-DD HH:mm:ss"), // Format end date
      };
      const formData = new FormData();
      formData.append("image", fileList[0]?.originFileObj);
      Object.keys(formattedValues).forEach((key) => {
        formData.append(key, formattedValues[key]);
      });
  
      const response = await axios.post("http://localhost:3000/api/worker_set", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200 || response.status === 201) {
        messageApi.open({
          type: 'success',
          content: "Worker created successfully!",
        });
        form.resetFields();
        setFileList([]); // Clear file list after successful submission
      } else {
        throw new Error("Failed to create worker");
      }
    } catch (error) {
      console.error("Error", error);
      messageApi.open({
        type: 'error',
        content: "Failed to create Worker!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
    messageApi.open({
      type: 'warning',
      content: "Please fill out all required fields!",
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New form
        </Button>
        <div className="mt-5">
          <UserCard />
        </div>
        <Drawer
          title="ခွင့်တိုင်ဖိုင်"
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
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form
            className="m-4"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            hideRequiredMark
          >
            <div className="mb-5">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="id"
                    label="AG / AM"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter user AG / AM',
                      },
                    ]}
                  >
                    <Input placeholder="Please enter user AG / AM" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter the worker phone number!" },
                      { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
                    ]}
                  >
                    <Input placeholder="Enter worker phone number" className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter user name',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="condition"
                  label="Condition"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the Condition',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the Condition">
                    <Option value="Normal">Normal</Option>
                    <Option value="ဝန်ထမ်းသစ်">ဝန်ထမ်းသစ်</Option>
                    <Option value="အလုပ်နောက်ကျ">အလုပ်နောက်ကျ</Option>
                    <Option value="ခွင့်တစ်ပိုင်း">ခွင့်တစ်ပိုင်း</Option>
                    <Option value="ခွင့်တစ်ရက်">ခွင့်တစ်ရက်</Option>
                    <Option value="ခွင့်ရက်ရှည်">ခွင့်ရက်ရှည်</Option>
                    <Option value="ခွင့်မဲ့">ခွင့်မဲ့</Option>
                    <Option value="ဖိုင်းအပြစ်ပေး">ဖိုင်းအပြစ်ပေး</Option>
                    <Option value="အလုပ်ထွက်မည့်သူ">အလုပ်ထွက်မည့်သူ</Option>
                    <Option value="အလုပ်ထွက်သူ">အလုပ်ထွက်သူ</Option>
                    <Option value="ကြိုတင်ခွင့်တိုင်သူ">ကြိုတင်ခွင့်တိုင်သူ</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an Location',
                    },
                  ]}
                >
                  <Select placeholder="Please select an Location">
                    <Option value="ဆိုင်(၁)">ဆိုင်(၁)</Option>
                    <Option value="ဆိုင်(၂)">ဆိုင်(၂)</Option>
                    <Option value="ဆိုင်(၃)">ဆိုင်(၃)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="department"
                  label="ဌာန"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the ဌာန',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the ဌာန">
                    <Option value="Gထွက်">Gထွက်</Option>
                    <Option value="လက်လီ">လက်လီ</Option>
                    <Option value="လက်ကား">လက်ကား</Option>
                    <Option value="ကားအော်ဒါ">ကားအော်ဒါ</Option>
                    <Option value="အဝင်ပိုင်း">အဝင်ပိုင်း</Option>
                    <Option value="ပစ္စည်းမှာ">ပစ္စည်းမှာ</Option>
                    <Option value="အကြွေးကိုင်">အကြွေးကိုင်</Option>
                    <Option value="စက်ကိုင်">စက်ကိုင်</Option>
                    <Option value="အပြင်သွားပိုင်း">အပြင်သွား</Option>
                    <Option value="စီစစ်ရေး">စီစစ်ရေး</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Profile Picture"
                  name="image"
                  rules={[
                    { required: true, message: "Please upload a profile picture!" },
                    {
                      validator: (_, value) => {
                        if (fileList.length > 0) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Please upload a profile picture!");
                      },
                    },
                  ]}
                >
                  <Upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false} // Prevent automatic upload
                    listType="picture"
                    maxCount={1} // Allow only one file to be uploaded
                  >
                    <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  name="time"
                  label="DateTime"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the dateTime',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    // showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '100%' }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="reason"
                  label="အကြောင်းပြချက်"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Create Worker
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </>
  );
};

export default App;