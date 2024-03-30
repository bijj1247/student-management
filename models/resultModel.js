const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
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
  semester: {
    type: Number,
    required: [true, 'Please mention the semester the student is studying.'],
    min: [1, 'Student must be studying atleast 1st semester.'],
    max: [8, 'Please enter valid semester number.'],
  },
  MFCS: {
    type: Number,
    required: [true, 'Kindly enter the MFCS MARKS.'],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
  DBMS: {
    type: Number,
    required: [true, 'Kindly enter the DBMS Marks'],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
  DS: {
    type: Number,
    required: [true, 'Kindly enter the marks of data structures.'],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
  CSA: {
    type: Number,
    required: [
      true,
      'Kindly enter the marks of Computer Science Architecture.',
    ],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
  PS: {
    type: Number,
    required: [true, 'Kindly enter the marks of Probability and Statistics.'],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
  QMLR: {
    type: Number,
    required: [
      true,
      'kindly enter the marks of quantitative method learning .',
    ],
    min: [0, 'Negative or zero values cannot be taken.'],
    max: [100, 'Please enter valid marks.'],
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;