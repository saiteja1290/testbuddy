<<<<<<< HEAD:backend/models/examSchema.js
const mongoose = require("mongoose");

// Define the schema for a question
=======
import mongoose, { mongo } from "mongoose";
>>>>>>> 9b08e966b0191a580dcb0c09e012d2c09a93ac3a:backend/models/QuestionSchema.js
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
<<<<<<< HEAD:backend/models/examSchema.js
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
=======
const ExamSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    numQuestions: {
        type: Number,
        required: true
    },
    studentQuestions: {
        type: Number,
        required: true
    },
    questions: [questionSchema]
});

const Question = mongoose.model("Questions", ExamSchema);
export default Question;
>>>>>>> 9b08e966b0191a580dcb0c09e012d2c09a93ac3a:backend/models/QuestionSchema.js
