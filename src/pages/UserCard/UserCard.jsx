import React, { useEffect, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Spin, Modal } from 'antd';
import { Alert } from 'antd';
const { Meta } = Card;
import LeaderSet from './LeaderSet';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // Modal visibility for settings
  const [currentItem, setCurrentItem] = useState(null); // For storing the selected card data
  const [leader, setLeader] = useState(false); // State to manage LeaderSet modal
  const [selectItem, setSelectItem] = useState(null); // For storing selected worker data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/worker_list`);
        const response_set = await fetch(`http://localhost:3000/api/worker_set`);
       
        if (!response.ok || !response_set.ok) {
          throw new Error('Network combined is not ok');
        }
        const result = await response.json();
        const set_result = await response_set.json();

        const combined = [...result, ...set_result];
        console.log(combined);

        if (Array.isArray(result) || Array.isArray(set_result)) {
          setData(result);
        } else {
          console.error('Expected array response but got:', result ,set_result);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const current_date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

  const handleSettingClick = (item) => {
    setCurrentItem(item); // Set the item to show its settings
    setVisible(true); // Show settings modal
  };

  const handleEditClick = (item) => {
    setLeader(true); // Open LeaderSet modal when Edit button is clicked
    setSelectItem(item); // Store the selected item (worker)
  };

  const handleEllipsisClick = (item) => {
    console.log('Ellipsis clicked for item:', item);
  };

  const handleModalClose = () => {
    setVisible(false); // Close the settings modal
  };

  if (loading) {
    return (
      <div className="p-4 mt-10 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.length > 0 ? (
          // Filter workers whose date matches today's date
          data.filter(item => {
            // Extract only the date part from item.time
            const itemDate = item.time.split('T')[0]; // Getting the date part (YYYY-MM-DD)
            return itemDate === current_date && item.condition !== 'Normal'; // Compare only date and condition
          }).map((item, index) => (
            <Card
              className="shadow-sm"
              key={index}
              style={{ width: 300 }}
              cover={
                item.reason ? (
                  <div className="flex justify-between pt-6">
                    <div>
                    <span className={`border-2 ml-4 pl-2 pr-2 pt-1 pb-1 rounded-full
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
                        {item.condition}
                    </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 flex justify-center items-center">
                    <span>No condition comment provided.</span>
                  </div>
                )
              }
              actions={[
                <SettingOutlined key="setting" onClick={() => handleSettingClick(item)} style={{ color: 'blue' }} />,
                <EditOutlined key="edit" onClick={() => handleEditClick(item)} style={{ color: 'green' }} />,
                <EllipsisOutlined key="ellipsis" onClick={() => handleEllipsisClick(item)} style={{ color: 'red' }} />,
              ]}
            >
              <Meta
                avatar={<Avatar src={item.profile || 'https://via.placeholder.com/150'} className='border-2 border-blue-500'/>}
                title={item.name || 'Unknown Name'}
                description={item.department || 'No id provided.'}
              />
            </Card>
          ))
        ) : (
          <div>No workers found!</div>
        )}
      </div>

      {/* Second card section for all workers */}
      <div className="grid grid-cols-1 mt-4 border-t-2 border-gray-500 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.length > 0 ? (
            data.filter(item => item.condition !== 'Normal').map((item, index) => (
            <Card
                className="shadow-sm"
                key={index}
                style={{ width: 300 }}
                cover={
                item.reason ? (
                    <div className="flex justify-between pt-6">
                    <div>
                        <span
                        className={`border-2 ml-4 pl-2 pr-2 pt-1 pb-1 rounded-full
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
                        `}
                        >
                        {item.condition}
                        </span>
                    </div>
                    </div>
                ) : (
                    <div className="bg-gray-200 flex justify-center items-center">
                    <span>No condition comment provided.</span>
                    </div>
                )
                }
                actions={[
                <SettingOutlined key="setting" onClick={() => handleSettingClick(item)} style={{ color: 'blue' }} />,
                <EditOutlined key="edit" onClick={() => handleEditClick(item)} style={{ color: 'green' }} />,
                <EllipsisOutlined key="ellipsis" onClick={() => handleEllipsisClick(item)} style={{ color: 'red' }} />,
                ]}
            >
                <Meta
                avatar={<Avatar src={item.profile || 'https://via.placeholder.com/150'} className="border-2 border-blue-500" />}
                title={item.name || 'Unknown Name'}
                description={item.department || 'No condition provided.'}
                />
            </Card>
            ))
        ) : (
            <div>No workers found!</div>
        )}
        </div>
      {/* Settings Modal */}
      <Modal title="Settings" visible={visible} onCancel={handleModalClose} footer={null}>
        <p>Settings for {currentItem ? currentItem.name : 'Item'}</p>
        {/* Add your settings content here */}
      </Modal>

      {/* Conditionally Render LeaderSet */}
      {leader && selectItem && <LeaderSet setLeader={setLeader} item={selectItem} />}
    </div>
  );
};

export default App;
