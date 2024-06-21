import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import bodyParser from "body-parser";
import {
  init,
  flush,
} from "compilex";
import { compilethecode, fullstat_controller, sample_question } from "./controllers/compiler.controller.js";
import { getquestionset } from "./controllers/auth.controller.js";
import { getQuestionsByRoomId } from "./controllers/compiler.controller.js";
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
app.get("/api/question", sample_question);

// Route to compile and run code
app.post("/compilecode", compilethecode);

// Route to get full statistics of the compiler
app.get("/fullStat", fullstat_controller);

router.get('/questions/:roomID', getQuestionsByRoomId);
//Route to get questions from roomid
// app.get("/api/getquestionset", router)
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