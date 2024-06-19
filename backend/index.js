import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("Welcome to MERN stack Project");
});

app.use("/api/user", router);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(8080, () => {
      console.log("App is listening to port: 8080");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
