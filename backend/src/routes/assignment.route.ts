import express from "express";
import { createAssignment, deleteAssignment, downloadPdf, getAllAssignments, getAssignmentById } from "../controllers/assignment.controller";


const router = express.Router();

router.get("/" , getAllAssignments);
router.get("/:id",getAssignmentById);
router.post("/create", createAssignment);
router.delete("/:id", deleteAssignment);
router.get("/:id/pdf",downloadPdf);
export default router;