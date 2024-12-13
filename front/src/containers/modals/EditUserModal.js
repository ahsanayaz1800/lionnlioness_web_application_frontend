import React, { useState } from 'react';
import { Button, Modal, Input, Switch } from 'antd';
import axios from 'axios';
import 'dotenv/config';
import Materialize from "materialize-css";

const baseURL = process.env.REACT_APP_BASE_URL;

const EditUserModal = ({ user, isVisible, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    mail: user.mail || '',
    status: user.status === 1 ? 1 : 0, // Set status as 1 (active) or 0 (deactive)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (checked) => {
    // Toggle between active (1) and deactive (0)
    setFormData((prevData) => ({
      ...prevData,
      status: checked ? 1 : 0,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting with data:", formData); // Log form data before submission
    try {
      const data = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        mail: formData.mail,
        status: formData.status, // Should be 1 or 0
      };

      const response = await axios.post(`${baseURL}/admin/update/${user.id}`, { data: data });
      
      if (response.status === 200) {
        Materialize.toast({
          html: "User Updated Successfully",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
        onEdit(); // Call the onEdit prop to refresh the user list after update
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>,
      ]}
    >
      <div>
        <Input
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          style={{ marginBottom: '10px' }}
        />
        <Input
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          style={{ marginBottom: '10px' }}
        />
        <Input
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          placeholder="Email"
          style={{ marginBottom: '10px' }}
        />
        <div style={{ marginBottom: '10px' }}>
          <span>Status: {formData.status === 1 ? 'Active' : 'Deactive'}</span>
          <Switch 
            checked={formData.status === 1} 
            onChange={handleToggle} 
            style={{ marginLeft: '10px' }} 
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
