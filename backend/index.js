import express, { response } from "express";
// import { PORT, mongourl } from "./config.js";
// import dotenv from "dotenv";
import mongoose from "mongoose";
// import booksRoute from "./routes/booksRoute.js";
// import { Book } from "./models/bookmodel.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
//express
const app = express();
// const cors = require('cors');
app.use(express.json());
//CORS Policy 
// app.use(cors(
//     // {
//     //     origin: ["https://deploy-mern-1whq.vercel.app"],
//     //     methods: ['POST', 'GET'],
//     //     credentials: true
//     // }
// ))
app.use(cors())
app.get('/', (req, res) => {
    console.log(req)
    return response.status(200).send("Welcome to MERN stack Project")
});

// app.use('/books', booksRoute)



//Route to save a new book

//Mongoose
// PORT = 8080
mongoose
    .connect(process.env.mongo_url)
    .then(() => {
        console.log('App connected to database');
        app.listen(8080, () => {
            console.log("App is listening to port: 8080");
        });
    })
    .catch((error) => {
        console.log(error);
    });
