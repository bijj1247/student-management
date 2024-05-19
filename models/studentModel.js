const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Result must have student name.'],
    unique: true,
    trim: true,
    maxlength: [40, 'A student name cannot exceed more than 40 characters.'],
    minlength: [10, 'A student name must contain atleast 10 characters.'],
  },
  id: {
    type: Number,
    required: [true, 'A Student must have his id'],
  },
  branch: {
    type: String,
    required: [true, 'Student must have a branch'],
    enum: {
      values: ['CSE', 'ECE', 'IT', 'EEE', 'MECH'],
      message: 'Branch is either CSE,ECE,EEE,IT,MECH',
    },
  },
  semester: {
    type: Number,
    required: [true, 'Please mention the semester the student is studying.'],
    min: [1, 'Student must be studying atleast 1st semester.'],
    max: [8, 'Please enter valid semester number.'],
  },
  contact: {
    type: Number,
    required: [true, 'Please mention contact number.'],
    min: [1000000000, 'Please enter valid Number'],
    max: [9999999999, 'Please enter Valid Number.'],
  },
  Father: {
    type: String,
    required: [true, 'Please mention father Name.'],
    maxlength: [40, 'Please enter valid name.'],
    minlength: [3, 'Please enter valid name.'],
  },
  City: {
    type: String,
    required: [true, 'please enter your city .'],
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
    lowercase:true,
    validate:[validator.isEmail,'Please provide a valid email.']
  },
  password: {
    type: String,
    required: [true, 'Please enter Password.'],
    minlength:[8,'Password should have atleast 8 characters.']
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
