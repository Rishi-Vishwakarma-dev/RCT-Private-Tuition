const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: String,
    standard: Number,
    absent: Array,
    present: Array
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = AttendanceModel;
