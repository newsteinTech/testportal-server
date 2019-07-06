import {Request} from "express"
import {questionModel} from "../models/question"

export class questionService {
    public static async create(req:any){
        //return "Create Question Called"
        try
        {
        let newQuestion = new questionModel(req.body)
        await newQuestion.save()
        return "Question Created successfully"
        }
        catch(err){ 
            return err
        }
    }

    public static async update(req:Request){
        return await questionModel.findByIdAndUpdate(req.body._id,req.body,{new : true})
    }
}