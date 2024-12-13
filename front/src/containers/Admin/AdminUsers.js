import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Input, Space, Tag, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DeleteUser from '../modals/DeleteUserModal';
import EditUserModal from '../modals/EditUserModal';
import Loader from '../../components/loader/loader';
import 'dotenv/config';

const baseURL = process.env.REACT_APP_BASE_URL;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/users`);
      setUsers(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      setError('Error fetching users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search users function
  const searchUsers = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/admin/search_by_name`, {
        params: { name: query },
      });
      setUsers(Array.isArray(response.data.users) ? response.data.users : [response.data]);
    } catch (err) {
      setError('Error searching users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === '') {
      fetchUsers(); // Fetch all users if the input is empty
    }
  };

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      searchUsers(trimmedQuery);
    }
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalVisible(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalVisible(false);
    setSelectedUserId(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedUser(null);
  };

  const handleUserEdited = () => {
    fetchUsers(); // Re-fetch the user list after an update
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: 'Email',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? 'Active' : 'Deactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div style={{ width: '100%', padding: '20px'}}>
      <div style={{display:'flex', justifyContent:"space-between"}}>


      <div>
          <h4>Users</h4>


      </div>
      <div>
      <Space style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: 300 , height:60}}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </Space>

      </div>

      </ div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id}
        bordered
        pagination={{ pageSize: 50, showSizeChanger: false }}  // Disables items-per-page dropdown
        scroll={{ y: 330 }}  // Adds vertical scroll if items overflow
        style={{ width: '100%' , height:'100%'}}
      />
      {isDeleteModalVisible && (
        <DeleteUser
          userId={selectedUserId}
          onClose={handleModalClose}
          onDelete={handleUserEdited}
        />
      )}
      {isEditModalVisible && selectedUser && (
        <EditUserModal
          user={selectedUser}
          isVisible={isEditModalVisible}
          onClose={handleEditModalClose}
          onEdit={handleUserEdited}
        />
      )}
    </div>
  );
};

export default UsersList;
