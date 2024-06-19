const mongoose = require("mongoose");

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  testCases: {
    type: String,
    required: true,
  },
  answers: {
    type: String,
    required: true,
  },
});

// Define the schema for the exam settings
const examSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  studentQuestions: {
    type: Number,
    required: true,
  },
  questions: [questionSchema],
});

// Create the model for the exam
const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
