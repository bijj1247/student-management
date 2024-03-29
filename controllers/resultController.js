const marks = [
  { id: 571, name: 'Sreeja', semester: 3, csa: 'A+', dbms: 'A', MFCS: 'B+' },
  { id: 574, name: 'Ganesh', semester: 3, csa: 'A', dbms: 'B', MFCS: 'C' },
  { id: 576, name: 'Sanjay', semester: 3, csa: 'A+', dbms: 'A+', MFCS: 'A+' },
];


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

exports.updateResult = (req, res) => {
  const id = req.params.id * 1;
  const index = marks.findIndex((el) => el.id === id);
  // console.log(index)
  const updatedResult = req.body;
  marks[index] = updatedResult;
  res.status(200).json({
    status: 'Success',
  });
};

exports.deleteResult = (req, res) => {
  const id = req.params.id;
  const index = marks.findIndex((el) => el.id === id);
  marks.splice(index, 1);
  res.status(200).json({
    status: 'success',
    message: 'Result Successfully deleted.',
  });
};
