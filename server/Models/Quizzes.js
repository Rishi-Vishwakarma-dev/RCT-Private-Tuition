const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  standard: Number,
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
});

const QuizModel = mongoose.model("Quiz", quizSchema);
module.exports = QuizModel;

