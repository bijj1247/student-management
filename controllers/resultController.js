const fs = require('fs');
// const mam = require('../dev-data/results.json')

const marks = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/results.json`)
);

exports.getAllResults = (req, res) => {
  try {
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

exports.getResultsById = (req, res) => {
  console.log(req.params.id);
  const id = req.params.id * 1;

  const result = marks.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
};

exports.createResult = (req, res) => {
  try {
    const newStudentResult = req.body;
    marks.push(newStudentResult);

    fs.writeFile(
      `${__dirname}/../dev-data/results.json`,
      JSON.stringify(marks),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: newStudentResult,
        });
      }
    );
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateResult = (req, res) => {
  const id = req.params.id * 1;
  const index = marks.findIndex((el) => el.id === id);
  // console.log(index)
  const updatedResult = req.body;
  marks[index] = updatedResult;
  fs.writeFile(
    `${__dirname}/../dev-data/results.json`,
    JSON.stringify(marks),
    (err) => {
      res.status(200).json({
        status: 'Success',
      });
    }
  );
 
};

exports.deleteResult = (req, res) => {
  const id = req.params.id;
  const index = marks.findIndex((el) => el.id === id);
  marks.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/results.json`,
    JSON.stringify(marks),
    (err) => {
      res.status(200).json({
        status: 'Success',
      });
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
  });
};
