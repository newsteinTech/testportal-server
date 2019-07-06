import {testService} from "../services/testServices"
import {Request,Response} from "express"

export class testController {

    public async bookTest(req:Request,res:Response)
    {
        let result = await testService.bookTest(req)
        res.send(result)
    }
}