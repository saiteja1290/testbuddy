import mongoose, { mongo } from "mongoose";
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    testCases: {
        type: String,
        required: true
    },
    answers: {
        type: String,
        required: true
    }
});

// Define the schema for the exam settings
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