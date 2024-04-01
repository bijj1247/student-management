const fs = require('fs')
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/students.json`)
)

// const students = [
//   {
//     id: 571,
//     name: 'Sreeja',
//     semester: 3,
//     city: 'Hyderabad',
//     address: 'Rajendra Nagar',
//     contact: 8919125836,
//   },
//   {
//     id: 574,
//     name: 'Ganesh',
//     semester: 3,
//     city: 'Hyderabad',
//     address: 'Banjara Hills',
//     contact: 8919125836,
//   },
//   {
//     id: 576,
//     name: 'Sanjay',
//     semester: 3,
//     city: 'Hyderabad',
//     address: 'Manikonda',
//     contact: 9945687988,
//   },
// ];

exports.getAllStudents = (req, res) => {
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

exports.getStudentById = async (req, res) => {
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

exports.createStudent = (req, res) => {
  try {
    const newStudent = req.body;
    students.push(newStudent);

    fs.writeFile(
      `${__dirname}/../dev-data/students.json`,
      JSON.stringify(students),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: newStudent,
        });
      }
    );
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

exports.updateStudent = (req, res) => {
  try {
    const id = req.params.id * 1;
    const index = students.findIndex((el) => el.id === id);
    // console.log(index)
    const updatedStudent = req.body;
    students[index] = updatedStudent;

    fs.writeFile(
      `${__dirname}/../dev-data/students.json`,
      JSON.stringify(students),
      (err) => {
        res.status(200).json({
          status: 'Success',
        });
      }
    );
  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};

exports.deleteStudent = (req, res) => {
  try {
    const id = req.params.id * 1;
    const index = students.findIndex((el) => el.id === id);
    students.splice(index, 1);

    fs.writeFile(
      `${__dirname}/../dev-data/students.json`,
      JSON.stringify(students),
      (err) => {
        res.status(200).json({
          status: 'Success',
          message: 'Student Successfully deleted.',
        });
      }
    );

  } catch (err) {
    res.status(406).json({
      status: 'Failure',
      message: err,
    });
  }
};
