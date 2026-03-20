import express from "express";
import { createAssignment, deleteAssignment, getAllAssignments } from "../controllers/assignment.controller";


const router = express.Router();

router.get("/" , getAllAssignments);
router.post("/create", createAssignment);
router.delete("/:id", deleteAssignment);

export default router;