import Question from "../models/QuestionSchema.js";

export const createQuestions = async (req, res) => {
  const { roomId, numQuestions, studentQuestions, questions } = req.body;

  // Validation of request body
  if (
    !roomId ||
    typeof numQuestions !== "number" ||
    typeof studentQuestions !== "number" ||
    !Array.isArray(questions)
  ) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  if (questions.length !== numQuestions) {
    return res.status(400).send({
      message: "Number of questions does not match the numQuestions field",
    });
  }

  // Validate each question
  for (const q of questions) {
    if (
      !q.questionText ||
      !Array.isArray(q.testCases) ||
      q.testCases.length !== 5
    ) {
      console.log(q);
      return res.status(400).send({
        message: "Each question must have questionText and 5 testCases",
      });
    }
    for (const tc of q.testCases) {
      if (!tc.input || !tc.expectedOutput) {
        return res.status(400).send({
          message: "Each test case must have input and expectedOutput",
        });
      }
    }
  }

  try {
    // Create a new exam instance
    const newExam = new Question({
      roomId,
      numQuestions,
      studentQuestions,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        testCases: q.testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        })),
      })),
    });

    // Save the exam to the database
    await newExam.save();

    // Send a success response
    res
      .status(201)
      .send({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getQuestionsByRoomId = async (req, res) => {
  try {
    const { roomID } = req.params;
    const exam = await Question.findOne({ roomId: roomID });
    if (!exam) {
      return res
        .status(404)
        .json({ message: "No exam found with the provided room ID" });
    }
    res.status(200).json({ questions: exam.questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
