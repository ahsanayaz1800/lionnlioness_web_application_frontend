const pool = require('../config/database'); // Assuming you have a db.js file for pool connection

const packageModel = {
  createPackage: async (packageDetails) => {
    try {
      const { title, duration, price, status } = packageDetails;
      const sql = `INSERT INTO packages (title, duration, price, status) VALUES (?, ?, ?, ?)`;
      const values = [title, duration, price, status];

      const result = await pool.query({ sql, values });
      return result;
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  getAllPackages: async () => {
    try {
      const sql = 'SELECT * FROM packages';
      const result = await pool.query(sql);
      return result; // Return all packages
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  getPackageById: async (id) => {
    try {
      const sql = 'SELECT * FROM packages WHERE id = ?';
      const values = [id];
      const result = await pool.query({ sql, values });

      if (result.length === 0) {
        throw new Error('Package not found');
      }

      return result[0]; // Return the package
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  updatePackage: async (id, packageData) => {
    const { title, duration, price, status } = packageData;
    try {
      const sql = `UPDATE packages SET title = ?, duration = ?, price = ?, status = ? WHERE id = ?`;
      const values = [title, duration, price, status, id];

      await pool.query({ sql, values });
      return { message: 'Package updated successfully' }; // Return success message
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  deletePackage: async (id) => {
    try {
      const sql = 'DELETE FROM packages WHERE id = ?';
      const values = [id];
      await pool.query({ sql, values });
      return { message: 'Package deleted successfully' }; // Return success message
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },
};


module.exports = packageModel;
