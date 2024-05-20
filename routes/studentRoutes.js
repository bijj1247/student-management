const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController')
const router = express.Router();

router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.post('/login',authController.login)
router
  .route('/:id')
  .get(authController.protect,studentController.getStudentById)
  .patch(studentController.updateStudent)
  .delete(authController.protect,  studentController.deleteStudent);

module.exports = router;