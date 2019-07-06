import mongoose from "mongoose"
import {ResponseModel} from "../helpers/responseModel"
import {testModel} from "../models/testModel"
import {Request} from "express"

export class testService{
    public static async bookTest(req:Request)
    {
        try {
        let newTest = new testModel(req.body)
        await newTest.save()
        let data:any = await testModel.findOne({"mobile": req.body.mobile}).exec()
        let newData = {
            "username" : data.mobile,
            "testcode" : data._id
        }
        return ResponseModel.getValidResponse(newData)
        }
        catch(err){
            return ResponseModel.getInValidResponse(err)
        }
        
    }
}