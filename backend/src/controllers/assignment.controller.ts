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