import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminSchema.js";
import StudentUser from "../models/StudentSchema.js";
import bcryptjs from "bcryptjs";

export const adminsignup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new AdminUser({ email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

export const adminsignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await AdminUser.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
  }
};

export const stundetsignup = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new StudentUser({ email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

export const studentsignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await StudentUser.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
  }
};
