import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button, message, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons"; // Import an icon for the upload button
import axios from "axios";
import "antd/dist/reset.css";

const { Option } = Select;
const { TextArea } = Input;

const WorkerCreateForm = ({ onClose }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        time: values.time.format("YYYY-MM-DD HH:mm:ss"),
      };

      const formData = new FormData();
      Object.keys(formattedValues).forEach((key) => {
        formData.append(key, formattedValues[key]);
      });

      // Append the profile picture file to the formData
      if (fileList.length > 0) {
        formData.append("profile", fileList[0].originFileObj);
      }

      // Log formData content
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post("http://localhost:3000/api/worker_list", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        // message.success("Worker created successfully!");
        messageApi.open({
          type: 'success',
          content: "Worker created successfully!",
        });
        form.resetFields();
        setFileList([]); // Clear the file list after successful submission
        onClose(false);
      } else {
        throw new Error("Failed to create worker");
      }
    } catch (error) {
      console.error("Error:", error);
      // message.error("Failed to create worker!");
      messageApi.open({
        type: 'error',
        content: "Failed to create worker!",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill out all required fields!");
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className="flex items-center justify-center">
      {contextHolder}
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Worker</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: "Please enter the worker ID!" }]}
              >
                <Input placeholder="Enter worker ID" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter the worker name!" }]}
              >
                <Input placeholder="Enter worker name" className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
                    <Option value="ဆိုင်(၁)">ဆိုင်(၁)</Option>
                    <Option value="ဆိုင်(၂)">ဆိုင်(၂)</Option>
                    <Option value="ဆိုင်(၃)">ဆိုင်(၃)</Option>
                  </Select>
                </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please select the department!" }]}
          >
            <Select placeholder="Select department" className="w-full">
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

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select status" className="w-full">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Condition"
                name="condition"
                rules={[{ required: true, message: "Please select the condition!" }]}
              >
                <Select placeholder="Select condition" className="w-full">
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
            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please select the time!" }]}
              >
                <DatePicker showTime className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please enter the reason!" }]}
          >
            <TextArea rows={4} placeholder="Enter reason" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Profile Picture"
            name="profile"
            rules={[{ required: true, message: "Please upload a profile picture!" }]}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              loading={loading}
            >
              Create Worker
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WorkerCreateForm;