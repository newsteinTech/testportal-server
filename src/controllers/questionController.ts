import {Request,Response} from "express"
import {questionService} from "../services/questionService"
import {ResponseModel} from "../helpers/responseModel"

export class questionController {
    public async create(req:any,res:Response){
        let Result = await questionService.create(req)
        res.send(ResponseModel.getValidResponse(Result))
    }

    public async update(req:Request,res:Response){
        let Result = await questionService.update(req)
    }
}