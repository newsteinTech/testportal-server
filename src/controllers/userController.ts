import {Request,Response} from "express"
import {userService} from "../services/userService"
import {ResponseModel} from "../helpers/responseModel"

export class userController {
    
    public async loginUser(req:Request,res:Response){

        let result = await userService.loginUser(req)
        
        res.send(ResponseModel.getValidResponse(result))
    }

    public async signUpUser(req:Request,res:Response){

            let result = await userService.signUpUser(req)
            console.log(result)
            res.send(ResponseModel.getValidResponse(result))
    }

}