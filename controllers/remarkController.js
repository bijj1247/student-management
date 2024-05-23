const Remark = require('../models/remarkModel');
const catchAsync = require('./../utils/catchAsync')
const factory = require('./factoryHandler');

exports.getAllRemarks = factory.getAll(Remark)

exports.createRemark = factory.createOne(Remark)
exports.deleteRemark = factory.deleteBYMongoId(Remark)
