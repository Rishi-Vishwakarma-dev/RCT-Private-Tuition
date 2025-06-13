const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    standard: { type: Number, required: true },
    courses: [
        {
            title: { type: String, required: true },
            imageUrl: { type: String, required: true },
            download: { type: String, required: true }
        }
    ]
});

const CoursesModel = mongoose.model("Courses", CoursesSchema);

module.exports = CoursesModel;
