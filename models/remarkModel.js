const mongoose = require('mongoose');
const Student = require('./../models/studentModel')
const remarkSchema = new mongoose.Schema(
  {
    remark: {
      type: String,
      required: [true, 'Remark cannot be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'Remark must belong to a student.'],
    },
    mentor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Admin',
      required: [true, 'Remark must belong to a admin/mentor.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

remarkSchema.pre(/^find/,function(next){
    this.populate({
        path:'student',
        select:'name'
    })
    this.populate({
        path: 'mentor',
        select: 'name'
    })
    next();
})

const Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;
