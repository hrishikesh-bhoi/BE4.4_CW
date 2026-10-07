const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    studentRegistrationNumber: String,
    studentId: String,
    studebtName: String,
    fatherGaurdianName: String,
    class: String,
    emergencyContact: Number,
    studentProfileImageUrl: String,
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;