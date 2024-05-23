const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Modal) =>
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const doc = await Modal.findOneAndDelete(id);
    if (!doc) {
      return next(new AppError('ID not found', 404));
    }

    res.status(202).json({
      status: 'success',
      message: 'Result Successfully deleted.',
      data: { doc },
    });
  });

exports.deleteBYMongoId = (Modal) =>
  catchAsync(async (req, res) => {
    const doc = await Modal.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('ID not found', 404));
    }

    res.status(202).json({
      status: 'success',
      message: 'Successfully deleted.',
      data: { doc },
    });
  });

exports.updateOne = Modal => catchAsync(async (req, res, next) => {
  const doc = await Modal.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) {
    return next(new AppError('ID not found!', 404));
  }
  res.status(200).json({
    status: 'Success',
    data: doc,
  });
});

exports.createOne = Modal =>catchAsync(async (req, res, next) => {
  const doc = await Modal.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { doc },
  });
});