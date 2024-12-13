const express = require('express');
const router = express.Router();
const { adminLogin, getAllUsers, deleteUser,updateUserData,searchUserByName } = require('../controllers/adminController');
const verifyAdminToken = require('../middlewares/adminAuthMiddleware');
const { createPackage,getPackageById,getPackages,updatePackage,deletePackage } = require('../controllers/packageController');

router.post('/login', adminLogin);
router.get('/users', getAllUsers);
router.post('/delete/:user_id',deleteUser)
router.post('/update/:user_id',updateUserData)
router.get('/search_by_name', searchUserByName);


//packages 

router.post('/create_packages',createPackage )
router.get('/get_all_packages', getPackages); // GET request to fetch all packages
router.get('/get_packages/:id', getPackageById); // GET request to fetch a package by ID
router.put('/update_packages/:id', updatePackage); // PUT request to update a package by ID
router.delete('/delete_packages/:id', deletePackage); // DELETE request to delete a package by ID


module.exports = router;
