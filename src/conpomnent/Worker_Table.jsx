import { useState, useEffect } from 'react';
import { Table, Space, Tag, Spin, Alert } from 'antd';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'condition',
    dataIndex: 'condition',
    key: 'condition',
    render: (_, { condition }) => (
      <span className={condition === "Normal" ? 'text-gray-800' :
        condition === "အလုပ်နောက်ကျ" ? 'text-orange-300' : condition === "ခွင့်တစ်ပိုင်း" ? 'text-green-300' :
        condition === "ခွင့်တစ်ရက်" ? 'text-green-500' : condition === "ခွင့်ရက်ရှည်" ? 'text-blue-500' :
        condition === "ခွင့်မဲ့" ? 'text-pink-500' : condition === "ဖိုင်းအပြစ်ပေး" ? 'text-red-500' :
        condition === "အလုပ်ထွက်မည့်သူ" ? 'text-black' : condition === "အလုပ်ထွက်သူ" ? 'text-white border-2 border-black' :
        condition === "ကြိုတင်ခွင့်တိုင်သူ" ? 'text-purple-500' : condition === "လူသစ်" ? 'text-black bg-orange-400' : ''}>
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-56'>
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
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </div>
  );
};

export default App;
