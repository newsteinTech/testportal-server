import { questionModel } from "../models/questions";
import { ResponseModel } from "../helper/responseModel";
import {Request, Response} from "express";

export class QuestionService{

    public static async createQuestion(req: Request){

        try{
           let newQuestion= new questionModel(req.body)
           await newQuestion.save();
           return ResponseModel.getValidResponse(newQuestion);
        }
        catch(e){
           return ResponseModel.getInvalidResponse(e);
        }
     
    }

    public static async updateQuestion(req: Request){

        try{
            let a = await questionModel.findByIdAndUpdate(req.params.id, req.body).exec();
            return ResponseModel.getValidResponse(a);
        }

        catch(err){
            console.log(err);
            return ResponseModel.getInvalidResponse(err);
        }
        
    }

    public static async deleteQuestion(req: Request){

        // we are not deleting the question from the database, just making the active property false
        try{
            let question = await questionModel.findByIdAndUpdate(req.params.id, req.query).exec(); // send active=false in query of url
            return ResponseModel.getValidResponse(question);
        }

        catch(err){
            console.log(err);
            return ResponseModel.getInvalidResponse(err);
        }
        
    }

    public static async getAllQuestions(req: Request){

        try{
            let allQuestions= await questionModel.find({'active': true}).exec(); // finds all active questions
            return ResponseModel.getValidResponse(allQuestions);
        }
 
        catch(err){
              console.log(err);
              ResponseModel.getInvalidResponse(err);
        }
    }

    public static async getQuestionById(req: Request){

        try{
            let question= await questionModel.findById(req.params.id).exec();
            return ResponseModel.getValidResponse(question);
        }
 
        catch(err){
              console.log(err);
              ResponseModel.getInvalidResponse(err);
        }
    }
}