import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import UserCard from './UserCard';
import AutoComplate from './AutoComplete'
import axios from 'axios';

const { Option } = Select;
const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async(values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
      };
      const formData = new FormData();
      formData.append("image", imageFile);
      Object.keys(formattedValues).forEach((key) => {
        formData.append(key, formattedValues[key]);
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      };
      const response = await axios.post("http://localhost:3000/api/worker_list", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 || response.status === 201) {
        message.success("Worker created successfully!");
        form.resetFields();
      } else {
        throw new Error("Failed to create worker");
      };
    } catch (error) {
      console.error("Error", error);
      message.error("Failed to create Worker!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed =(errorInfo) => {
    console.log("Failed", errorInfo);
    message.error("Please fill out all required fields!");
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div >
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New form
      </Button>
      <div className='mt-5'>
        <UserCard/>
        {/* <UserCard/> */}
      </div>
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
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" hideRequiredMark>
          <div className='mb-5'>
            <AutoComplate/>
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
                name="phone number"
                label="phone number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user phone number',
                  },
                ]}
              >
                <Input placeholder="Please enter user phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: 'Please select an Location',
                  },
                ]}
              >
                <Select placeholder="Please select an Location">
                  <Option value="xiao">Location 1</Option>
                  <Option value="mao">Location 2</Option>
                  <Option value="location3">Location 3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ဌာန"
                label="ဌာန"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the ဌာန',
                  },
                ]}
              >
                <Select placeholder="Please choose the ဌာန">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                  <Option value="public">Public</Option>
                  <Option value="public">Public</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="Condition"
                label="Condition"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the Condition',
                  },
                ]}
              >
                <Select placeholder="Please choose the Condition">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the Type',
                  },
                ]}
              >
                <Select placeholder="Please choose the Type">
                  <Option value="jack">Rest</Option>
                  <Option value="tom">Out</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
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
        </Form>
      </Drawer>
      </div>
    </>
  );
};
export default App;