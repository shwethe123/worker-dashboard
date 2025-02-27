import { useState, useEffect } from 'react';
import { Table, Space, Tag, Spin, Alert, Button, Modal, Form, Input } from 'antd';
import dayjs from 'dayjs';

const columns = (handleDelete, handleEdit) => [
  {
    title: 'Profile',
    dataIndex: 'profile',
    key: 'profile',
    render: (text) => (
      <img src={text} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
    ),
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <span className="text-sm font-semibold">{text}</span>,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (text) => <span className="text-xs text-gray-600">{text}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <span className={`text-xs font-medium
      ${text === 'Active' ? 'text-green-500' : ''}
      ${text === 'Inaction' ? 'text-red-500' : ''}
      ${text === 'On leave' ? 'text-orange-400' : ''}
      `}>{text}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span className="text-sm text-gray-500 font-bold">{text}</span>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: (time) => <span className="text-xs text-gray-700">{dayjs(time).format('YYYY/MM/DD HH:mm:ss')}</span>,
  },
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
    render: (condition) => (
      <span
      className={`border-2 ml-4 pl-2 pr-2 pt-1 pb-1 rounded-full
          ${condition === 'ဝန်ထမ်းသစ်' ? 'border-orange-400 bg-orange-100 text-orange-600' : ''}
          ${condition === 'အလုပ်နောက်ကျ' ? 'border-yellow-400 bg-yellow-100 text-yellow-600' : ''}
          ${condition === 'ခွင့်တစ်ပိုင်း' ? 'border-green-400 bg-green-100 text-green-600' : ''}
          ${condition === 'ခွင့်တစ်ရက်' ? 'border-indigo-400 bg-indigo-100 text-indigo-600' : ''}
          ${condition === 'ခွင့်ရက်ရှည်' ? 'border-teal-400 bg-teal-100 text-teal-600' : ''}
          ${condition === 'ခွင့်မဲ့' ? 'border-red-400 bg-red-100 text-red-600' : ''}
          ${condition === 'ဖိုင်းအပြစ်ပေး' ? 'border-pink-400 bg-pink-100 text-pink-600' : ''}
          ${condition === 'အလုပ်ထွက်မည့်သူ' ? 'border-purple-400 bg-purple-100 text-purple-600' : ''}
          ${condition === 'အလုပ်ထွက်သူ' ? 'border-gray-400 bg-gray-100 text-gray-600' : ''}
          ${condition === 'ကြိုတင်ခွင့်တိုင်သူ' ? 'border-blue-400 bg-blue-100 text-blue-600' : ''}
      `}
      >{condition}</span>
    ),
  },
  // {
  //   title: 'Tags',
  //   key: 'Condition',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {(tags || []).map((tag) => (
  //         <Tag color={tag.length > 5 ? 'geekblue' : 'green'} key={tag}>
  //           {tag.toUpperCase()}
  //         </Tag>
  //       ))}
  //     </>
  //   ),
  // },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/worker_list`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => setData((prev) => prev.filter((item) => item.id !== id));

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setData((prev) => prev.map((item) => (item.id === editingRecord.id ? { ...item, ...values } : item)));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => setIsModalVisible(false);

  if (loading) return <div className="flex justify-center items-center h-48"><Spin size="large" /></div>;
  if (error) return <Alert message="Error" description={error} type="error" />;

  return (
    <div className="p-2">
      <Table columns={columns(handleDelete, handleEdit)} dataSource={data} rowKey="id" size="small" />
      <Modal title="Edit Record" open={isModalVisible} onOk={handleSave} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="condition" label="Condition"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
