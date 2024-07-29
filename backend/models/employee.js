const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: Number,
    designation: String,
    gender: String,
    course: [String],
    createDate: { type: Date, default: Date.now },
    imageUrl: String
});

module.exports = mongoose.model('employee', employeeSchema);
