import {Request,Response} from "express"
import {questionService} from "../services/questionService"
import {ResponseModel} from "../helpers/responseModel"

export class questionController {
    public async create(req:any,res:Response){
        let Result = await questionService.create(req)
        console.log(typeof(Result))
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }
    }

    public async update(req:Request,res:Response){
        let Result = await questionService.update(req)
        console.log(typeof(Result))
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }    
    }

    public async getAllQuestions(req:Request,res:Response){
        let Result = await questionService.getAllQuestions()
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        } 
    }

    public async getById(req:Request,res:Response){
        let Result = await questionService.getById(req)
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }        
    }

    public async deleteById(req:Request,res:Response){
        let Result = await questionService.deleteByID(req)
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse("Question is Deleted Successfully"))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }
    }
}