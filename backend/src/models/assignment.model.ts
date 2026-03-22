import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: String,
  difficulty: String,
  marks: Number,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema], // ✅ FIX
});

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    instructions: String,
    formInput: Object,

    sections: [sectionSchema], // ✅ FIX

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;


