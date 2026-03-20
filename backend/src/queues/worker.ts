import dotenv from "dotenv";
import {Worker} from "bullmq";
import Assignment from "../models/assignment.model";
import { redis } from "../config/redis";
import { buildPrompt } from "../utils/promptBuilder";
import { generateQuestions } from "../services/ai.service";
import { parseAIResponse } from "../utils/parser";
import { connectDB } from "../config/db";
import { getIo } from "../sockets/socket";

dotenv.config();

connectDB();

const worker = new Worker(
    "assignmentQueue",
    async(job)=>{
        const { assignmentId, data } = job.data;

        console.log("Processing job : ", assignmentId)
        console.log("Job data:", data);
        const io = getIo();

        try{
            console.log("Generating with AI")

            const prompt = await buildPrompt(data);

            const rawResponse = await generateQuestions(prompt);


            const parsed = parseAIResponse(rawResponse || "");

            await Assignment.findByIdAndUpdate(assignmentId,{
                sections : parsed.sections,
                status : "completed"
            })


            
            io.emit("assignment-ready",{
                assignmentId
            })

            console.log("AI generation completed")

        }catch(error){
            console.log(error);
            await Assignment.findByIdAndUpdate(assignmentId,{
                status : "failed"
            })
             io.emit("assignment-failed",{
                assignmentId
            })

        }

    },
    {
        connection : redis
    }
)