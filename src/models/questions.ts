import mongoose from "mongoose";

export const questionSchema = new  mongoose.Schema({
  
    "statement": {type: String, required:true, unique: true},
    "optionA": {type: String, required:true},
    "optionB": {type: String, required:true},
    "optionC": {type: String, required:true},
    "optionD": {type: String, required:true},
    "correctAnswer": {type: Number, enum:[0,1,2,3]}, // refers to the correct answer put by the admin
    "active": Boolean,
    "codeBlock": String, // for coding output type questions
    "questionType":{type: String, enum:['C', 'Javascript', 'Aptitude']}
})

export let questionModel= mongoose.model("questionDetails", questionSchema);