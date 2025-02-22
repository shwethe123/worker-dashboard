import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Pagination } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

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
      <List
        dataSource={paginatedData} 
        bordered
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }

              
              
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description={item.id}
            />
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        style={{ marginTop: 16 }}
      />

      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        {selectedWorker ? (
          <>
            <p className="site-description-item-profile-p font-bold text-2xl" style={{ marginBottom: 24 }}>
              Worker Profile
            </p>
            <img src={`http://localhost:5000/${selectedWorker.profilePicture}`} alt={selectedWorker.name} width="100" />
            <p className="site-description-item-profile-p font-bold text-xl text-gray-500">Personal</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Full Name" content={selectedWorker.name} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Account" content={selectedWorker.id} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content={selectedWorker.condition} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content={selectedWorker.time} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Birthday" content={selectedWorker.birthday} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content={selectedWorker.website || "-"} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Message"
                  content={selectedWorker.message || "No message provided"}
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Company</p>
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
            <p className="site-description-item-profile-p">Contacts</p>
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
                <DescriptionItem title="Github" content={<a href={selectedWorker.github} target="_blank" rel="noreferrer">{selectedWorker.github}</a>} />
              </Col>
            </Row>
            <Button type="primary" size="large" icon={<AntDesignOutlined />}>
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
