const jwt = require('jsonwebtoken');
const { getAdminByEmail, comparePassword, updateUserById , searchUsersByName} = require('../services/adminService');
var userModel = require("../models/userModel");
var tagModel = require("../models/tagModel");
var pictureModel = require("../models/pictureModel");
const pool = require('../config/database'); // Import your db config
var input = require("../services/inputService");
const userService = require('../services/userService');

require('dotenv').config();

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Fetch admin by email
    const admin = await getAdminByEmail(email);
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    // Return success with token
    return res.json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
const getAllUsers = async (req, res) => {
    
    try {
        const rows = await pool.query('SELECT * FROM users'); // Fetch all users from the database
        return res.json(rows); // Return the users as JSON
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.user_id

  if (req.params.user_id) {
    await userModel.deleteUser(userId);
    await tagModel.deleteUserAllTags(userId);
    await pictureModel.deleteUserAllPictures(userId);
  }
  return res.status(200).json({ msg: "Bravoooo!" });
}
const updateUserData = async (req, res) => {
  const userId = req.params.user_id; // User ID from the URL parameters
  const { firstname, lastname, mail, status } = req.body.data; // Update data should come from `req.body.data`

  console.log('Update request body:', req.body.data); // Log the correct request body for debugging

  try {
      let updateData = {
          firstname: firstname || null,
          lastname: lastname || null,
          mail: mail || null,
          status: status || null,
      };

      const updatedUser = await updateUserById(userId, updateData);

      if (updatedUser) {
          return res.status(200).json({
              message: 'User updated successfully!',
              data: updatedUser,
          });
      } else {
          return res.status(404).json({ message: 'User not found or no updates were made.' });
      }
  } catch (error) {
      console.error('Error in updateUserData controller:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
const searchUserByName = async (req, res) => {
  const { name } = req.query; // Query parameter `name`
  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const result = await searchUsersByName(name);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  adminLogin,
  getAllUsers,
  deleteUser,
  updateUserData,
  searchUserByName,
};




