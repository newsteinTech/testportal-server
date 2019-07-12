import {Request} from "express"
import {testModel} from "../models/test"

export class actualTestService {
    public static async create(req:Request){
        //return "Create Test Called"
        try
        {
        let newTest = new testModel(req.body)
        await newTest.save()
        return "Question Created successfully!!"
        }
        catch(err){ 
            err.type ="error"
            return err
        }
    }
}