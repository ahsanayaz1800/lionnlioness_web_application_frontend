const packageModel = require('../models/packageModel');

const packageService = {
  createPackage: async (packageDetails) => {
    try {
      const result = await packageModel.createPackage(packageDetails);
      return { id: result.insertId, ...packageDetails }; // Return the created package details
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Unable to create package");
    }
  },
  getPackages: async () => {
    try {
      const packages = await packageModel.getAllPackages();
      return packages;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Unable to fetch packages");
    }
  },

  getPackageById: async (id) => {
    try {
      const package = await packageModel.getPackageById(id);
      return package;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Unable to fetch package");
    }
  },

  updatePackage: async (id, packageData) => {
    try {
      const result = await packageModel.updatePackage(id, packageData);
      return result;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Unable to update package");
    }
  },

  deletePackage: async (id) => {
    try {
      const result = await packageModel.deletePackage(id);
      return result;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Unable to delete package");
    }
  },
};

module.exports = packageService;
