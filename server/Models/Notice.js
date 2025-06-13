const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    standard: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const NoticeModel = mongoose.model("Notice", noticeSchema);

module.exports = NoticeModel;
