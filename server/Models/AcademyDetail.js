const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    batches: [
        {
            currentBatch: String,
            academicYear: String,
            startDate: String
        }
    ],
    rankers: [
        {
            rankersName: String,
            rankersGrade: String,
            rankersImage: String
        }
    ]
});

const AcademyDetailModel = mongoose.model("AcademyDetail", academySchema);

module.exports = AcademyDetailModel;
