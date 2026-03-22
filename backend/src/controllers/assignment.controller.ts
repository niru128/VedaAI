import Assignment from "../models/assignment.model";
import { assignmentQueue } from "../queues/assignment.queue";
import { Request, Response } from "express";
import PDFDocument from "pdfkit";

export const createAssignment = async (req : Request, res : Response)=>{

	try{

		const data = req.body;
		const assignment = await Assignment.create({
			formInput : data,
			status : "pending"
		})

		await assignmentQueue.add("generate-assignment",{
			assignmentId : assignment._id,
			data
		})

		res.json({
			success : true,
			assignmentId : assignment._id
		})

	}catch(error){
		console.log(error);
		res.status(500).json({error : "Something went wrong"});
	}
}

export const getAssignmentById = async (req : Request, res : Response) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllAssignments = async (req : Request , res : Response)=>{
	try{
		const response = await Assignment.find({status : "completed"}).sort({createdAt : -1});
		res.json(response);
	}catch(error){
		console.log("Failed to get all assingments" , error);
		res.status(500).json({error : "Failed to fetch assignments"});
	}
}

export const deleteAssignment = async (req : Request , res : Response)=>{
	try{
		await Assignment.findByIdAndDelete(req.params.id);
		res.json({success : true});
	}catch(error){
		res.status(500).json({error : "Deletion failed"});
	}
}


export const downloadPdf = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=assignment.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(18).text("Assignment", { align: "center" });
    doc.moveDown();

    // Instructions
    if (assignment.instructions) {
      doc.fontSize(12).text(`Instructions: ${assignment.instructions}`);
      doc.moveDown();
    }

    // Sections + Questions
    assignment.sections?.forEach((section: any) => {
      doc.fontSize(14).text(section.title || "Section");
      doc.moveDown();

      section.questions?.forEach((q: any, i: number) => {
        doc.text(`${i + 1}. ${q.text} (${q.marks || 1} marks)`);
        doc.moveDown(0.5);
      });

      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};