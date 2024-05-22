const Remark = require('../models/remarkModel');
const catchAsync = require('./../utils/catchAsync')

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

exports.createRemark = catchAsync(async (req, res, next)=>{
    const newRemark = await Remark.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            remark: newRemark
        }
    })
})