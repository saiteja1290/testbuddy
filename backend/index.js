import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
// import exam from "./routes/examschemaroute.js";
// import { Exam } from "./models/examSchema.js";

dotenv.config();
//express
const app = express();
// const cors = require('cors');
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return response.status(200).send("Welcome to MERN stack Project");
});
// routes
app.use("/api/user", router);
// app.use('/api/quesiton', exam);
// app.use('/books', booksRoute)

//Route to save a new book

//Mongoose
// PORT = 8080
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
