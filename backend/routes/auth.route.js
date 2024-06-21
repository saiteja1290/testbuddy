import express from "express";
import {
  adminsignup,
  adminsignin,
  stundetsignup,
  studentsignin,
  questions_teda,
  getquestionset,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/studentsignup", stundetsignup);
router.post("/studentlogin", studentsignin);
router.post("/adminsignup", adminsignup);
router.post("/adminlogin", adminsignin);
router.post("/questions", questions_teda);
router.get("/getquestionsset", getquestionset);

export default router;
