import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import bodyParser from "body-parser";
import {
  init,
  compileCPP,
  compileCPPWithInput,
  compileJava,
  compileJavaWithInput,
  compilePython,
  compilePythonWithInput,
  fullStat,
  flush,
} from "compilex";

dotenv.config();
//express
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const option = { stats: true };
init(option);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN stack Project");
});

// Auth routes
app.use("/api/user", router);

// Endpoint to fetch question and test cases
app.get("/api/question", (req, res) => {
  const questionData = {
    question:
      "Write a function that takes an array of integers and returns the sum of all even numbers in the array.",
    testCases: [
      "Input: [1, 2, 3, 4, 5] - Output: 6",
      "Input: [2, 4, 6, 8, 10] - Output: 30",
      "Input: [1, 3, 5, 7] - Output: 0",
    ],
  };
  res.json(questionData);
});

// Route to compile and run code
app.post("/compilecode", (req, res) => {
  const { code, lang, inputRadio } = req.body;
  const input = req.body.input || "";

  let envData = { OS: "windows" };

  console.log(`Received code: ${code}`);
  console.log(`Language: ${lang}`);
  console.log(`Input: ${input}`);

  const callback = (data) => {
    console.log(`Compiler response: ${JSON.stringify(data)}`);
    res.send(data.error ? { error: data.error } : { output: data.output });
  };

  if (lang === "C" || lang === "C++") {
    envData.cmd = "g++";
    if (input) {
      compileCPPWithInput(envData, code, input, callback);
    } else {
      compileCPP(envData, code, callback);
    }
  } else if (lang === "Java") {
    if (input) {
      compileJavaWithInput(envData, code, input, callback);
    } else {
      compileJava(envData, code, callback);
    }
  } else if (lang === "Python") {
    if (inputRadio === "true") {
      compilePythonWithInput(envData, code, input, (data) => {
        res.send(data);
      });
    } else {
      compilePython(envData, code, callback);
    }
  }
});

// Route to get full statistics of the compiler
app.get("/fullStat", (req, res) => {
  fullStat((data) => {
    res.send(data);
  });
});

//Mongoose connection
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("App connected to database");
    app.listen(8080, () => {
      console.log("App is listening to port: 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Flush all the temporary files
flush(() => {
  console.log("All temporary files flushed!");
});
