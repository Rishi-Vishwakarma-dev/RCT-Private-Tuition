const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        standard: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

const ReportModel = mongoose.model("Report", reportSchema);

module.exports = ReportModel;
