const pool = require('../config/database'); // Assuming you have a db.js file for pool connection
const userModel = require('../models/userModel'); // Import your user model if necessary

const createSubscription = async (userId, packageName, packageId, packagePrice, chargeId) => {
  try {
    // First, insert the subscription details into the subscriptions table
    await pool.query('INSERT INTO subscriptions (userId, packageName, packageId, packagePrice, chargeId) VALUES (?, ?, ?, ?, ?)', 
      [userId, packageName, packageId, packagePrice, chargeId]);

    // Then, update the user's packageName and packageId in the users table
    await pool.query('UPDATE users SET packageName = ?, packageId = ? WHERE id = ?', 
      [packageName, packageId, userId]);
      
  } catch (error) {
    console.error('Error processing subscription:', error);
    throw new Error('Database error while creating subscription or updating user package info');
  }
};

module.exports = {
  createSubscription,
};
