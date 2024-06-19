import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
// import exam from "./routes/examschemaroute.js";
// import { Exam } from "./models/examSchema.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
<<<<<<< HEAD
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
=======
    console.log(req);
    return response.status(200).send("Welcome to MERN stack Project");
});
// routes
app.use('/api/user', router);
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
>>>>>>> 9b08e966b0191a580dcb0c09e012d2c09a93ac3a
