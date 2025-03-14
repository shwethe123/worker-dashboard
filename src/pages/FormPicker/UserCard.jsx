import React, { useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Modal } from 'antd';
import axios from 'axios'; // Import axios for HTTP requests

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App = () => {
  const [workers, setWorkers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(''); 

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const reasonResponse = await axios.get('http://localhost:3000/api/worker_list'); 

        const imageResponse = await axios.get('http://localhost:3000/api/worker_set');

        const mergedWorkers = reasonResponse.data.map((worker) => {

          const workerImage = imageResponse.data.find(imageData => imageData.id === worker.id);
          return {
            ...worker,
            image: workerImage ? workerImage.image : '',
          };
        });

        setWorkers(mergedWorkers);
        console.log(setWorkers)
      } catch (error) {
        console.error('Error fetching worker data:', error);
      }
    };

    fetchWorkers();
  }, []);

  const showImageModal = (image) => {
    setCurrentImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={workers}
        footer={
          <div>
            <b>Worker List</b> Footer
          </div>
        }
        renderItem={(worker) => (
          <List.Item
            key={worker.id}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={150}
                alt="worker profile"
                src={worker.image || 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                onClick={() => showImageModal(worker.image)}
                style={{ cursor: 'pointer' }}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={worker.profile} />}
              title={<a href="https://ant.design">{worker.name}</a>}
              description={worker.department}
            />
            <p>{worker.reason}</p>
          </List.Item>
        )}
      />

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        width="50%" 
        style={{ textAlign: 'center' }}
      >
        <img
          alt="full-view"
          style={{ width: '100%', height: 'auto' }}
          src={currentImage}
        />
      </Modal>
    </div>
  );
};

export default App;
