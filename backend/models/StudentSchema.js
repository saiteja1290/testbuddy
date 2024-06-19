import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollnumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentUser = mongoose.model("Stundet", studentSchema);

export default StudentUser;
