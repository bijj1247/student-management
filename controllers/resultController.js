const fs = require('fs');
const Result = require('../models/resultModel');
// const mam = require('../dev-data/results.json')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const marks = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/results.json`)
// );

exports.getResultByMongoId = catchAsync( async (req, res) => {
    //1)filtering
    //Building query
    console.log('in correct place');
    console.log(req.query);
    const queryObj = { ...req.query };
    console.log(queryObj);
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //g is for repeating multiple times
    const query = Result.find(JSON.parse(queryStr));

    //2)sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    if (req.query.page) {
      const numStudents = await Result.countDocuments();
      if (skip > numStudents) throw new Error('This page does not exist.');
    }
    query = query.skip(skip).limit(limit);

    //executing query
    const marks = await query;
    //Sending response
    res.status(200).json({
      status: 'Success',
      results: marks.length,
      data: { marks },
    });

});

exports.getAllResults = catchAsync(async (req, res) => {
    const marks = await Result.find();
    res.status(200).json({
      status: 'success',
      results: marks.length,
      data: {
        marks,
      },
    });
  
});

exports.getResultsById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;

  const result = await Result.findOne({ id: req.params.id });
  if (!result) {
    return next(new AppError('No student found with the ID',404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});



exports.createResult = catchAsync(async (req, res, next) => {
  const newStudentResult = await Result.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { student: newStudentResult },
  });
});

exports.updateResult = catchAsync(async (req, res) => {
  const id = req.params.id * 1;
  const result = await Result.findOneAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    return next(new AppError('No student found with the ID',404))
  }
  res.status(200).json({
    status: 'Success',
  });
});

exports.deleteResult = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await Result.findOneAndDelete(id);
  if (!result) {
    return next(new AppError('No student found with the ID',404))
  }
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
    data: { result },
  });
});

exports.aliaTopScorers = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-DS,PS,DBMS,CSA';
  req.query.fileds = 'name';
  next();
};
