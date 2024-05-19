const fs = require('fs');
const Student = require('../models/studentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')

exports.getAllStudents = (req, res) => {
  try {
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
    const result = students.find((el) => el.id === id);
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
    id:req.body.id,
    name: req.body.name,
    semester: req.body.semester,
    City: req.body.City,
    address: req.body.address,
    contact:req.body.contact,
    Father:req.body.Father,
    password: req.body.password,
    branch: req.body.branch,
    email:req.body.email
  });
  res.status(201).json({
    status: 'success',
    data: { student: newStudent },
  });
});

exports.updateStudent = catchAsync(async(req, res,next) => {
  const id = req.params.id * 1;
  const student = await Student.findOneAndUpdate(id, req.body, {
    new: true,
  });
  if (!student) {
    return next(new AppError('No student found with the ID',404))
  }
  res.status(200).json({
    status: 'Success',
  });
});

exports.deleteStudent = catchAsync(async(req, res) => {
  const id = req.params.id;
  const student = await Student.findOneAndDelete(id);
  if (!student) {
    return next(new AppError('No student found with the ID',404))
  }
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
    data: { student },
  });
});
