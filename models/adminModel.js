const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin must have name'],
  },
  emp_id: {
    type: Number,
    required: [true, 'Please specify Id.'],
  },
  contact: {
    type: Number,
    required: [true, 'please specify your contact number.'],
  },
  department: {
    type: String,
    enum: {
      values: ['Adminstrative', 'Accounts', 'Teaching'],
      message: 'Deparment must be either Adminstrative,Acconts,Teaching',
    },
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please specify password.'],
    minlength: [6, 'Password must contain atleast 6 characters.'],
    maslength: [15, 'Password should not exceed 15 characters.'],
  },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
