import Assignment from "../models/assignment.model";
import { assignmentQueue } from "../queues/assignment.queue";
import { Request, Response } from "express";

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

export const getAllAssignments = async (req : Request , res : Response)=>{
	try{
		const response = await Assignment.find().sort({createdAt : -1});
	}catch(error){
		console.log("Failed to get all assingments" , error);
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