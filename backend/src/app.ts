import express from "express";
import cors from "cors";
import assignmentRoutes from "./routes/assignment.route"

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/assignment" , assignmentRoutes);

app.get("/" , (req, res)=>{
    console.log("VedaAI Backend is running");
    res.json({message: "VedaAI Backend is running"});
})

export default app;