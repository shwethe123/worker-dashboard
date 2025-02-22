import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Pagination } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import CreateForm from '../Create/Create'

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const App = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); 
  const [selectedWorker, setSelectedWorker] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize] = useState(5);  // Set page size for pagination

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch('http://localhost:3000/api/worker_list');
        if (!responseData.ok) {
          throw new Error('Network responseData is not ok');
        }
        const result = await responseData.json();
        if (Array.isArray(result)) {
          setData(result); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const showDrawer = (id) => {
    setSelectedWorker(id); 
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedWorker(null); 
  };

  // Pagination logic: Get the current page data
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  return (
    <>
      <div className=' bg-white p-2 rounded-lg shadow-lg'>
        <div className='flex text-xl font-bold justify-between ml-10 mr-5 mt-2'>
            <h1>Worker List</h1>
            
          <CreateForm/>
        </div>
        <List
        className='border-none m-4'
          dataSource={paginatedData} 
          bordered
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <a className='text-blue-500' onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={item.profile} alt="Profile" width="50" height="50"  />
                }

                
                
                title={<a href="https://ant.design/index-cn">{item.name}</a>}
                description={item.id}
              />
            </List.Item>
          )}
        />
        
      <Pagination
        className='m-4'
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />
    </div>

    <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        {selectedWorker ? (
          <>
            <div className="flex justify-center mb-8">
              <Avatar src={selectedWorker.profile} size={120} className="border-4 border-blue-500" />
              <img src={selectedWorker.profile} alt="" />
            </div>
            <p className="text-3xl font-bold text-center text-blue-600">{selectedWorker.name}</p>
            <p className="text-xl text-center text-gray-500 mb-6">{selectedWorker.position}</p>

            <Divider />

            <p className="font-semibold text-lg text-gray-700">Personal Information</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Full Name" content={selectedWorker.name} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Account ID" content={selectedWorker.id} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content={selectedWorker.city} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content={selectedWorker.country} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Birthday" content={selectedWorker.birthday} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content={selectedWorker.website || "N/A"} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Message" content={selectedWorker.message || "No message provided"} />
              </Col>
            </Row>

            <Divider />

            <p className="font-semibold text-lg text-gray-700">Company Information</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Position" content={selectedWorker.position} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Responsibilities" content={selectedWorker.responsibilities} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Department" content={selectedWorker.department} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Supervisor" content={selectedWorker.supervisor} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Skills" content={selectedWorker.skills} />
              </Col>
            </Row>

            <Divider />

            <p className="font-semibold text-lg text-gray-700">Contact Information</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email" content={selectedWorker.email} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Phone Number" content={selectedWorker.phone} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Github" content={<a href={selectedWorker.github} target="_blank" rel="noreferrer" className="text-blue-600">{selectedWorker.github}</a>} />
              </Col>
            </Row>

            <Button type="primary" size="large" icon={<AntDesignOutlined />} className="mt-6 w-full">
              Card Print
            </Button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Drawer>
    </>
  );
};

export default App;
