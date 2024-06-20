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
  console.log(req);
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

  if (lang === "C" || lang === "C++") {
    envData.cmd = "g++";
    if (inputRadio === "true") {
      compileCPPWithInput(envData, code, input, (data) => {
        res.send(data);
      });
    } else {
      compileCPP(envData, code, (data) => {
        res.send(data.error ? data.error : data.output);
      });
    }
  } else if (lang === "Java") {
    if (inputRadio === "true") {
      compileJavaWithInput(envData, code, input, (data) => {
        res.send(data);
      });
    } else {
      compileJava(envData, code, (data) => {
        res.send(data.error ? data.error : data.output);
      });
    }
  } else if (lang === "Python") {
    if (inputRadio === "true") {
      compilePythonWithInput(envData, code, input, (data) => {
        res.send(data);
      });
    } else {
      compilePython(envData, code, (data) => {
        res.send(data);
      });
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
