import express from "express";
import { Exam } from "../models/examSchema";


const router = express.Router();
router.post('/', async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})