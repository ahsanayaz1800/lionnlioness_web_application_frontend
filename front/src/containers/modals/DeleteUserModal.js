import React from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import 'dotenv/config';
import Materialize from "materialize-css";

const baseURL = process.env.REACT_APP_BASE_URL;

const DeleteUser = ({ userId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${baseURL}/admin/delete/${userId}`);
      if (response.status === 200) {
        Materialize.toast({
          html: "User Deleted Successfully",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
        onDelete(); // Call the onDelete prop to refresh the user list
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={true} // Modal is always open when rendered
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete user with ID {userId}?</p>
    </Modal>
  );
};

export default DeleteUser;
