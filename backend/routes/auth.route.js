import express from "express";
import {
  adminsignup,
  adminsignin,
  stundetsignup,
  studentsignin,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("studentsignup", stundetsignup);
router.post("studentlogin", studentsignin);
router.post("adminsignup", adminsignup);
router.post("adminlogin", adminsignin);

export default router;
