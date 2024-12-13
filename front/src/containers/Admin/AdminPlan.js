import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Tag, Space, Row, Col, Modal, Form, Input, Switch, Pagination } from 'antd';
import { InputNumber } from 'antd';
const baseURL = process.env.REACT_APP_BASE_URL;

const PackagesPlan = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track if in edit mode
  const [currentPackage, setCurrentPackage] = useState(null); // Track the package being edited
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);

  // Fetch all packages when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${baseURL}/admin/get_all_packages`);
            console.log(response)
            // Assuming response.data is an array of packages with a property `id` for the unique identifier
            const packages = response.data.map(item => ({
                key: item.id,  // or whatever the correct field is
                title: item.title,
                price: item.price,
                duration: item.duration,
                status: item.status
            }));
            setDataSource(packages); // Use the modified packages array
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };
    

    fetchPackages();
  }, []);

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text) => <span>£{text}</span>, // Formatting price
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <Tag color={text === 'Active' ? 'green' : 'red'}>{text}</Tag>
      ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleAddNewClick = () => {
    setIsModalVisible(true);
    setEditMode(false);
    form.resetFields(); // Reset form when adding new
  };

  const handleEdit = (record) => {
    setCurrentPackage(record); // Set current package to be edited
    form.setFieldsValue(record); // Populate form fields
    setEditMode(true);
    setIsModalVisible(true);
};
  const handleDelete = async (key) => {
    try {
      await axios.delete(`${baseURL}/admin/delete_packages/${key}`); // Assuming key is the package ID
      setDataSource(dataSource.filter((item) => item.key !== key)); // Update local state
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    const packageData = {
        title: values.title,
        price: typeof values.price === 'string' ? 
            parseFloat(values.price.replace('£', '').replace(',', '')) : 
            values.price,
        duration: values.duration,
        status: values.status ? 'Active' : 'Deactive',
    };

    try {
        if (editMode) {
            await axios.put(`${baseURL}/admin/update_packages/${currentPackage.key}`, packageData);
            // Update local dataSource
            setDataSource(dataSource.map(item => (item.key === currentPackage.key ? { ...item, ...packageData } : item)));
        } else {
            const response = await axios.post(`${baseURL}/admin/create_packages`, packageData);
            // Update local dataSource with the new package
            setDataSource([...dataSource, { key: dataSource.length + 1, ...packageData }]);
        }
    } catch (error) {
        console.error('Error submitting package:', error);
    }

    setIsModalVisible(false);
    form.resetFields();
};

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h3>Packages Plan</h3>
      <Row justify="space-between" style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={handleAddNewClick}>
          + Add New
        </Button>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        style={{ width: '100%' }}
      />
      <Row justify="space-between" align="middle" style={{ marginTop: '20px' }}>
        <Col>
          <div>
            Showing 1 to {dataSource.length} of {dataSource.length} entries
          </div>
        </Col>
        <Col>
          <Pagination
            total={dataSource.length}
            pageSize={1}
            showSizeChanger={false}
            style={{ float: 'right' }}
          />
        </Col>
      </Row>

      {/* Add / Edit Package Modal */}
      <Modal
        title={editMode ? "Edit Package" : "Add New Package"}
        open={isModalVisible} // Updated to use `open` instead of `visible`
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            label="Package Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the package title!' }]}
          >
            <Input placeholder="Enter package title" />
          </Form.Item>
          <Form.Item
            label="Package Duration"
            name="duration"
            rules={[{ required: true, message: 'Please enter the package duration!' }]}
          >
            <Input placeholder="Enter duration (e.g., month)" />
          </Form.Item>
          <Form.Item
    label="Package Price"
    name="price"
    rules={[{ required: true, message: 'Please enter the package price!' }]}>
    <InputNumber 
        style={{ width: '100%' }} 
        placeholder="Enter price (e.g., 20)" 
        formatter={value => `£${value}`}
        parser={value => value.replace('£', '')}
    />
</Form.Item>
          <Form.Item
            label="Package Status"
            name="status"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Deactive" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PackagesPlan;
