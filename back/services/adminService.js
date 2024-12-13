const passwordHash = require("password-hash");
const pool = require('../config/database'); // Import your db config
var userModel = require("../models/userModel");
// Service to fetch admin by email
const getAdminByEmail = async (email) => {
  const adminQuery = 'SELECT * FROM admins WHERE email = ?';
  try {
    const result = await pool.query(adminQuery, [email]);
    console.log('Admin fetched:', result);
    if (result.length > 0) {
      return result[0]; // Return the admin data if found
    }
    return null; // Return null if no admin found
  } catch (error) {
    throw new Error('Error fetching admin from the database.');
  }
};

// Service to compare password with the hashed password in DB
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = passwordHash.verify(password, hashedPassword);
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords.');
  }
};
const updateUserById = async (userId, updateData) => {
  try {
      const result = await userModel.updateUser(userId, updateData);

      // Log affectedRows to ensure something was updated
      console.log('Update affectedRows:', result.affectedRows);

      if (result.affectedRows === 0) {
          return null; // No rows updated, user may not exist or no changes were made
      }

      // Fetch the updated user details after update
      const updatedUser = await userModel.getUserById(userId);
      return updatedUser[0]; // Return the first user object, assuming it returns an array
  } catch (error) {
      console.error('Error in updateUserById service:', error);
      throw new Error('Database update error');
  }
};
const searchUsersByName = async (name) => {
  try {
    const users = await userModel.findUsersByName(name);
    if (users.length === 0) {
      return { message: "No users found", users: [] };
    }
    return { users };
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Unable to search users");
  }
};


module.exports = {
  getAdminByEmail,
  searchUsersByName,
  comparePassword,
  updateUserById
};
