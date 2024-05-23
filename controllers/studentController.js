const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./factoryHandler');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('remarks');
    res.status(200).json({
      status: 'Success',
      results: students.length,
      data: students,
    });
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const result = await Student.findOne({ id }).populate('remarks');
    res.status(200).json({
      status: 'Success',
      result: result.length,
      data: result,
    });
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

exports.createStudent = catchAsync(async (req, res) => {
  const newStudent = await Student.create({
    id: req.body.id,
    name: req.body.name,
    semester: req.body.semester,
    City: req.body.City,
    address: req.body.address,
    contact: req.body.contact,
    Father: req.body.Father,
    password: req.body.password,
    branch: req.body.branch,
    email: req.body.email,
    mentor: req.body.mentor,
  });

  const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: { student: newStudent },
  });
});



exports.updateStudent = factory.updateOne(Student)

exports.deleteStudent = factory.deleteOne(Student);
