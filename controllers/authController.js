const Student = require('../models/studentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) to check email and passord exist.
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) check if user exists && passoword is correct.
  const student = await Student.findOne({ email }).select('+password');
  // const correct =

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 2) check if user exists && passoword is correct.
  const token = signToken(student._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting token and check of it' there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError('Your not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if student still exists
  const freshStudent = Student.findById(decoded.id);
  if (!freshStudent) {
    return next(
      new AppError('The token belonging to this student does no longer exist'),
      401
    );
  }

  // 4)Check if Student changed password after the token was issued
  // if (freshStudent.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again', 401)
  //   );
  // }
  req.student = freshStudent;
  next();
});
