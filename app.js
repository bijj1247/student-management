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
