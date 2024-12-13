const { raw } = require('mysql');
const packageService = require('../services/packageService');

const createPackage = async (req, res) => {
  try {
    const packageDetails = req.body; // Expecting package details in the request body
    const newPackage = await packageService.createPackage(packageDetails);
    return res.status(201).json(newPackage); // Return the created package as JSON
  } catch (error) {
    console.error('Error creating package:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
  
};
const getPackages = async (req, res) => {
    try {
      const packages = await packageService.getPackages();
      return res.json(packages); // Return packages as JSON
    } catch (error) {
      console.error('Error fetching packages:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  const getPackageById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const package = await packageService.getPackageById(id);
      return res.json(package); // Return package as JSON
    } catch (error) {
      console.error('Error fetching package:', error);
      return res.status(404).json({ message: error.message }); // Return 404 if not found
    }
  };
  
  const updatePackage = async (req, res) => {
      const { id } = req.params;
      const packageData = req.body;
  
    try {
      const result = await packageService.updatePackage(id, packageData);
      return res.json(result); // Return success response
    } catch (error) {
      console.error('Error updating package:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  const deletePackage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await packageService.deletePackage(id);
      return res.json(result); // Return success response
    } catch (error) {
      console.error('Error deleting package:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}
module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage
}
