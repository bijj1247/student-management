const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const resultRouter = require('./routes/resultRoutes');
const studentRouter = require('./routes/studentRoutes');




// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middlewares 👋👋');
  next();
});


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

// app
//   .get('/api/v1/students', getAllStudents)
//   .post('/api/v1/students', createStudent);
// app
//   .get('/api/v1/students/:id', getStudentById)
//   .patch('/api/v1/students/:id', updateStudent)
//   .delete('/api/v1/students/:id', deleteStudent);

// Routes
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/results', resultRouter);

module.exports = app;
