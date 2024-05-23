const Remark = require('../models/remarkModel');
const catchAsync = require('./../utils/catchAsync')
const factory = require('./factoryHandler');

exports.getAllRemarks = catchAsync(async (req, res, next) =>{
    const remarks = await Remark.find();

    res.status(200).json({
        status: 'success',
        results: remarks.length,
        data: {
            remarks
        }
    })
})

exports.createRemark = factory.createOne(Remark)
exports.deleteRemark = factory.deleteBYMongoId(Remark)
