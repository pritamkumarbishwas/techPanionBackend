import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
