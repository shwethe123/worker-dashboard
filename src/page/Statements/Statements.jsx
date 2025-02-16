import React from 'react';
import { Card, Table, Button, Statistic, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const { Search } = Input;

const Statements = () => {
  const data = [
    {
      key: '1',
      statement: 'Q1 2025 Financial Report',
      amount: 120000,
      status: 'Completed',
    },
    {
      key: '2',
      statement: 'Q2 2025 Financial Report',
      amount: 95000,
      status: 'Pending',
    },
    {
      key: '3',
      statement: 'Q3 2025 Financial Report',
      amount: 134500,
      status: 'Completed',
    },
    {
      key: '4',
      statement: 'Q3 2025 Financial Report',
      amount: 134500,
      status: 'Completed',
    },
  ];

  const columns = [
    {
      title: 'Statement',
      dataIndex: 'statement',
      key: 'statement',
    },
    {
      title: 'Amount (USD)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Statistic value={amount} prefix="$" />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="">
      <Row gutter={16} className="mb-6">
        <Col span={24}>
          <Card title="Statements Overview" bordered={false} className="shadow-lg">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Total Statements" value={data.length} />
              </Col>
              <Col span={8}>
                <Statistic title="Total Amount" value={data.reduce((total, item) => total + item.amount, 0)} prefix="$" />
              </Col>
              <Col span={8}>
                <Statistic title="Completed Statements" value={data.filter(item => item.status === 'Completed').length} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row gutter={16} className="mb-6">
        <Col span={24}>
          <Card bordered={false} className="shadow-lg">
            <Search
              placeholder="Search Statements"
              onSearch={(value) => console.log(value)}
              enterButton={<SearchOutlined />}
              className="w-full"
            />
          </Card>
        </Col>
      </Row>

      {/* Table of Statements */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Statements List" bordered={false} className="shadow-lg">
            <Table dataSource={data} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row gutter={16} className="mt-6">
        <Col span={12}>
          <Button type="primary" block>
            Add New Statement
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default" block>
            Download Report
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Statements;
