//this is admin controller
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Admin = require('./../models/adminModel');
const jwt = require('jsonwebtoken');
const factory = require('./factoryHandler');

exports.getAllAdmins = factory.getAll(Admin);

exports.adminLogin = catchAsync(async (req, res, next) => {
  // 1) to check email and passord exist.
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) check if user exists && passoword is correct.
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || (await !admin.correctPassword(password, admin.password))) {
    return next(new AppError('Incorrect email or  Password', 401));
  }
  // 2) check if user exists && passoword is correct. send token
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.createAdmin = factory.createOne(Admin);
exports.updateAdmin = factory.updateOne(Admin);
exports.deleteAdmin = factory.deleteOne(Admin);
