import {Request} from "express"
import {questionModel} from "../models/question"

export class questionService {
    public static async create(req:any){
        //return "Create Question Called"
        try
        {
        let newQuestion = new questionModel(req.body)
        await newQuestion.save()
        return "Question Created successfully!!"
        }
        catch(err){ 
            err.type ="error"
            return err
        }
    }

    public static async update(req:Request){
        try{
            await questionModel.findByIdAndUpdate(req.body._id,req.body,{new : true})
            return "Question Updated successfully!!"
        }catch(err){
            err.type ="error"
            return err
        }
    }

    public static async getAllQuestions(){
        try{
            let result = questionModel.find({"active": true}).exec()
            return result
        }catch(err){
            err.type ="error"
            return err
        }
    }

    public static async getById(req:Request){
        try{
            let result = questionModel.findById(req.params.Id).exec()
            return result
        }catch(err){
            err.type ="error"
            return err
        }
    }

    public static async deleteByID(req:Request){
        try{
            let result = questionModel.findByIdAndDelete(req.body._id)
            return result
        }catch(err){
            err.type ="error"
            return err
        }
    }
}