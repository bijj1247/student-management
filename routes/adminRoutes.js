const express = require('express')
const authController = require('../controllers/authController');
const adminController = require('./../controllers/adminController')
const router = express.Router()

router.route('/').post(adminController.createAdmin).get(adminController.getAllAdmins)

router.route('/adminlogin').post(adminController.adminLogin)

module.exports = router;