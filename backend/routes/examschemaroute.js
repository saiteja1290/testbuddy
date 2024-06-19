import express from "express";
import { Exam } from "../models/examSchema";


const router = express.Router();
router.post('/', async (req, res) => {
    const { roomId, numQuestions, studentQuestions, questions } = req.body;

    // Validation of request body
    if (!roomId || typeof numQuestions !== 'number' || typeof studentQuestions !== 'number' || !Array.isArray(questions)) {
        return res.status(400).send({ message: "Invalid input data" });
    }

    if (questions.length !== numQuestions) {
        return res.status(400).send({ message: "Number of questions does not match the numQuestions field" });
    }

    // Validate each question
    for (const question of questions) {
        if (!question.question || !question.testCases || !question.answers) {
            return res.status(400).send({ message: "Each question must have questionText, testCases, and answers" });
        }
    }

    try {
        // Create a new exam instance
        const newExam = new Exam({
            roomId,
            numQuestions,
            studentQuestions,
            questions: questions.map(q => ({
                questionText: q.question,
                testCases: q.testCases,
                answers: q.answers
            }))
        });

        // Save the exam to the database
        await newExam.save();

        // Send a success response
        res.status(201).send({ message: "Exam created successfully", exam: newExam });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;