const fs = require('fs');
const Result = require('../models/resultModel');
// const mam = require('../dev-data/results.json')

// const marks = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/results.json`)
// );

exports.getResultByMongoId = async (req, res) => {
  try {
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
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    query = query.sort(sortBy);

    //executing query
    const marks = await query;
    res.status(200).json({
      status: 'Success',
      results: marks.length,
      data: { marks },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const marks = await Result.find();
    res.status(200).json({
      status: 'success',
      results: marks.length,
      data: {
        marks,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getResultsById = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;

  const result = await Result.findOne({ id: req.params.id });
  if (!result) {
    res.status(404).json({
      status: 'fail',
      message: 'No Message Found.',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
};

exports.createResult = async (req, res) => {
  try {
    const newStudentResult = await Result.create(req.body);
    // marks.push(newStudentResult);

    res.status(201).json({
      status: 'success',
      data: newStudentResult,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateResult = async (req, res) => {
  const id = req.params.id * 1;
  const result = await Result.findOneAndUpdate(id, req.body, {
    new: true
  });
  if (!result) {
    res.status(404).json({
      status: 'fail',
      message: 'No Message Found.',
    });
  }

  res.status(200).json({
    status: 'Success',
  });
};

exports.deleteResult = async (req, res) => {
  const id = req.params.id;
  const tour = await Result.findOneAndDelete(id);
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
    data: { tour },
  });
};
