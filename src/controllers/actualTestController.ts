import {Request,Response} from "express"
import {actualTestService} from "../services/actualTestService"
import {ResponseModel} from "../helpers/responseModel"

export class actualTestController {

    public async create(req:any,res:Response){
        
        let Result = await actualTestService.create(req)
        console.log(Result)
        console.log(typeof(Result))
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }
    }

    public async start (req:Request,res:Response){

        let Result = await actualTestService.start(req)
        console.log(Result)
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }
    }

    public async submit (req:Request,res:Response){

        let Result = await actualTestService.submit(req)
        console.log(Result)
        if(Result.type == "error"){
            res.send(ResponseModel.getInValidResponse(Result))
        }
        else{
        res.send(ResponseModel.getValidResponse(Result))
        }
    }
}