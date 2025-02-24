import { useState, useEffect } from 'react';
import { Table, Space, Tag, Spin, Alert, Button, Modal, Form, Input } from 'antd';
// import Chart from '../pages/over_view/Chart';

const columns = (handleDelete, handleEdit) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
    render: (_, { condition }) => (
      <span
        className={
          condition === 'Normal'
            ? 'text-gray-800'
            : condition === 'အလုပ်နောက်ကျ'
            ? 'text-orange-300'
            : condition === 'ခွင့်တစ်ပိုင်း'
            ? 'text-green-300'
            : condition === 'ခွင့်တစ်ရက်'
            ? 'text-green-500'
            : condition === 'ခွင့်ရက်ရှည်'
            ? 'text-blue-500'
            : condition === 'ခွင့်မဲ့'
            ? 'text-pink-500'
            : condition === 'ဖိုင်းအပြစ်ပေး'
            ? 'text-red-500'
            : condition === 'အလုပ်ထွက်မည့်သူ'
            ? 'text-black'
            : condition === 'အလုပ်ထွက်သူ'
            ? 'text-white border-2 border-black'
            : condition === 'ကြိုတင်ခွင့်တိုင်သူ'
            ? 'text-purple-500'
            : condition === 'လူသစ်'
            ? 'text-black bg-orange-400'
            : ''
        }
      >
        {condition}
      </span>
    ),
  },
  {
    title: 'Tags',
    key: 'Condition',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {(tags || []).map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
        <Button type="link" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      </Space>
    ),
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/worker_list`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError('API returned invalid data');
        }
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Handle edit
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record); // Set form values to the record being edited
    setIsModalVisible(true);
  };

  // Save edited data
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingRecord.id ? { ...item, ...values } : item
        )
      );
      setIsModalVisible(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-56">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <div>
      <Table
        columns={columns(handleDelete, handleEdit)}
        dataSource={data}
        rowKey="id"
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="condition" label="Condition">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;