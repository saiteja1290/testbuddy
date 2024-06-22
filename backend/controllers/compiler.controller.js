import {
  init,
  compileCPP,
  compileCPPWithInput,
  compileJava,
  compileJavaWithInput,
  compilePython,
  compilePythonWithInput,
  fullStat,
} from "compilex";

export const sample_question = async (req, res) => {
  const questionData = {
    question:
      "Write a function that takes an array of integers and returns the sum of all even numbers in the array.",
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expectedOutput: "6" },
      { input: "[2, 4, 6, 8, 10]", expectedOutput: "30" },
      { input: "[1, 3, 5, 7]", expectedOutput: "0" },
    ],
  };
  res.json(questionData);
};

export const compilethecode = (req, res) => {
  const { code, lang, input } = req.body;

  let envData = { OS: "windows" };

  console.log(`Received code: ${code}`);
  console.log(`Language: ${lang}`);
  console.log(`Input: ${input}`);

  const callback = (data) => {
    console.log(`Compiler response: ${JSON.stringify(data)}`);
    res.send(data.error ? { error: data.error } : { output: data.output });
  };
  if (lang === "Python") {
    if (input) {
      compilePythonWithInput(envData, code, input, callback);
    } else {
      compilePython(envData, code, callback);
    }
  }
};

export const fullstat_controller = (req, res) => {
  fullStat((data) => {
    res.send(data);
  });
};
