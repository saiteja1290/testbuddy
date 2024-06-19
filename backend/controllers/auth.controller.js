import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminSchema.js";
import StudentUser from "../models/StudentSchema.js";
<<<<<<< HEAD
=======
import bcryptjs from "bcryptjs";
// import ExamModel from "../models/examSchema.js";
import Question from "../models/QuestionSchema.js";
>>>>>>> 9b08e966b0191a580dcb0c09e012d2c09a93ac3a


export const questions_teda = async (req, res) => {
  const { roomId, numQuestions, studentQuestions, questions } = req.body;

  // Validation of request body
  if (!roomId || typeof numQuestions !== 'number' || typeof studentQuestions !== 'number' || !Array.isArray(questions)) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  if (questions.length !== numQuestions) {
    return res.status(400).send({ message: "Number of questions does not match the numQuestions field" });
  }

  // Validate each question
  for (const q of questions) {
    if (!q.questionText || !q.testCases || !q.answers) {
      console.log(q)
      return res.status(400).send({ message: "Each question must have questionText, testCases, and answers" });
    }
  }

  try {
    // Create a new exam instance
    const newExam = new Question({
      roomId,
      numQuestions,
      studentQuestions,
      questions: questions.map(q => ({
        questionText: q.questionText,
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
};
export const adminsignup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new AdminUser({ email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const adminsignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await AdminUser.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const stundetsignup = async (req, res) => {
  const { rollnumber, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new StudentUser({ rollnumber, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< HEAD
export const studentsignin = async (req, res, next) => {
=======
export const studentsignin = async (req, res) => {
>>>>>>> 9b08e966b0191a580dcb0c09e012d2c09a93ac3a
  const { rollnumber, password } = req.body;
  try {
    const validUser = await StudentUser.findOne({ rollnumber });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest, hashedPassword });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

