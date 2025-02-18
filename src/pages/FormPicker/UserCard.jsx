import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';

function UserCard() {
  const [data, setData] = useState();

  const UserData = [
    { id: 1, name: 'Salai', time: '35 second 1 minute 2 hour' },
    { id: 2, name: 'Nung', time: '40 second 4 minute 2 hour' },
    { id: 3, name: 'Mg', time: '39 second 11 minute 5 hour' },
    { id: 1, name: 'Salai', time: '35 second 1 minute 2 hour' },
    { id: 2, name: 'Nung', time: '40 second 4 minute 2 hour' },
    { id: 3, name: 'Mg', time: '39 second 11 minute 5 hour' },
    { id: 1, name: 'Salai', time: '35 second 1 minute 2 hour' },
    { id: 2, name: 'Nung', time: '40 second 4 minute 2 hour' },
    { id: 3, name: 'Mg', time: '39 second 11 minute 5 hour' },
  ];

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card
          title="Card 1"
          bordered={false}
          style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: 16 }}
        >
          {UserData.map((item, index) => (
            <div className='flex justify-between' key={index} style={{ marginBottom: 12 }}>
              <p className='m-1' style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</p>
              <p style={{ color: '#555' }}>{item.time}</p>
            </div>
          ))}
        </Card>
      </Col>

      <Col span={8}>
        <Card
          title="Card 2"
          bordered={false}
          style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: 16 }}
        >
          {UserData.map((item, index) => (
            <div className='flex justify-between' key={index} style={{ marginBottom: 12 }}>
              <p className='bg-purple-200 m-1' style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</p>
              <p style={{ color: '#555' }}>{item.time}</p>
            </div>
          ))}
        </Card>
      </Col>

      <Col span={8}>
        <Card
          title="Card 3"
          bordered={false}
          style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: 16 }}
        >
          {UserData.map((item, index) => (
            <div className='flex justify-between' key={index} style={{ marginBottom: 12 }}>
              <p className='bg-purple-200 m-1' style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</p>
              <p style={{ color: '#555' }}>{item.time}</p>
            </div>
          ))}
        </Card>
      </Col>
    </Row>
  );
}

export default UserCard;
