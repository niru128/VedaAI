import dotenv from "dotenv";
import { Worker } from "bullmq";
import Assignment from "../models/assignment.model.js";
// import { redis } from "../config/redis.js";
import redis from "../config/redis.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateQuestions } from "../services/ai.service.js";
import { parseAIResponse } from "../utils/parser.js";
import { connectDB } from "../config/db.js";
import { getIo } from "../sockets/socket";
import mongoose from "mongoose";

dotenv.config();

connectDB();

const worker = new Worker(
  "assignmentQueue",
  async (job) => {
    const { assignmentId, data } = job.data;

    console.log("Processing job : ", assignmentId);
    console.log("Job data:", data);
    // const io = getIo();

    try {
      const prompt = await buildPrompt(data);
      const rawResponse = await generateQuestions(prompt);

      const parsed = parseAIResponse(rawResponse || "");

      console.log("Parsed : ", parsed)

      if (!parsed.sections || parsed.sections.length === 0) {
  throw new Error("Invalid parsed data");
}

      const updated = await Assignment.findByIdAndUpdate(
  assignmentId,
  {
    sections: parsed.sections,
    status: "completed"
  },
  { returnDocument: "after" }
);

console.log("UPDATED DOC:", updated);

      console.log("AI generation completed");
    } catch (error) {
      console.log("Worker error:", error);

      await Assignment.findByIdAndUpdate(assignmentId, {
        status: "failed",
      });
    }
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);
