const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const resultRouter = require('./routes/resultRoutes');
const studentRouter = require('./routes/studentRoutes');
const marks = [
  { id: 571, name: 'Sreeja', semester: 3, csa: 'A+', dbms: 'A', MFCS: 'B+' },
  { id: 574, name: 'Ganesh', semester: 3, csa: 'A', dbms: 'B', MFCS: 'C' },
  { id: 576, name: 'Sanjay', semester: 3, csa: 'A+', dbms: 'A+', MFCS: 'A+' },
];

const students = [
  {
    id: 571,
    name: 'Sreeja',
    semester: 3,
    city: 'Hyderabad',
    address: 'Rajendra Nagar',
    contact: 8919125836,
  },
  {
    id: 574,
    name: 'Ganesh',
    semester: 3,
    city: 'Hyderabad',
    address: 'Banjara Hills',
    contact: 8919125836,
  },
  {
    id: 576,
    name: 'Sanjay',
    semester: 3,
    city: 'Hyderabad',
    address: 'Manikonda',
    contact: 9945687988,
  },
];

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middlewares 👋👋');
  next();
});

getAllResults = (req, res) => {
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

const getResultsById = (req, res) => {
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

const createResult = (req, res) => {
  try {
    const newStudentResult = req.body;
    marks.push(newStudentResult);
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

const updateResult = (req, res) => {
  const id = req.params.id * 1;
  const index = marks.findIndex((el) => el.id === id);
  // console.log(index)
  const updatedResult = req.body;
  marks[index] = updatedResult;
  res.status(200).json({
    status: 'Success',
  });
};

const deleteResult = (req, res) => {
  const id = req.params.id;
  const index = marks.findIndex((el) => el.id === id);
  marks.splice(index, 1);
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
  });
};
const getAllStudents = (req, res) => {
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
const getStudentById = (req, res) => {
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

const createStudent = (req, res) => {
  try {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json({
      status: 'success',
      data: newStudent,
    });
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

const updateStudent = (req, res) => {
  try {
    const id = req.params.id * 1;
    const index = students.findIndex((el) => el.id === id);
    // console.log(index)
    const updatedStudent = req.body;
    students[index] = updatedStudent;
    res.status(200).json({
      status: 'Success',
    });
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

const deleteStudent = (req, res) => {
  try {
    const id = req.params.id * 1;
    const index = students.findIndex((el) => el.id === id);
    students.splice(index, 1);
    res.status(200).json({
      status: 'success',
      message: 'Student Successfully deleted.',
    });
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

app.get('/api/v1/results', getAllResults).post('/api/v1/results', createResult);
app
  .get('/api/v1/results/:id', getResultsById)
  .patch('/api/v1/results/:id', updateResult)
  .delete('/api/v1/results/:id', deleteResult);
app
  .get('/api/v1/students', getAllStudents)
  .post('/api/v1/students', createStudent);
app
  .get('/api/v1/students/:id', getStudentById)
  .patch('/api/v1/students/:id', updateStudent)
  .delete('/api/v1/students/:id', deleteStudent);

// Routes
// app.use('/api/v1/students', studentRouter);
// app.use('/api/v1/results', resultRouter);

module.exports = app;
