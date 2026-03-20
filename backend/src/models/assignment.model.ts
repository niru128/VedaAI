import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text : String,
    difficult : String,
    marks : Number,
})

const sectionSchema = new mongoose.Schema({
    title : String,
    questions : {questionSchema}
})

const assignmentSchema = new mongoose.Schema({
    title : String,
    instructions : String,
    formInput : Object,

    sections : {sectionSchema},

    status : {
        type : String,
        enum : ["pending" , "completed", "failed"],
        default : "pending"
    }
},{timestamps : true});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;


