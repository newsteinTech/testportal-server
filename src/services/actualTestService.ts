import {Request} from "express"
import {testModel} from "../models/test"
import  {Functions} from "../helpers/usefulFunctions"

export class actualTestService {
    public static async create(req:Request){
        //return "Create Test Called"
        try
        {
        let test = {
            user : await Functions.searchUser(req.body.mobile),
            paymentRef : req.body.paymentRef
        }
        console.log(test)
        let newTest = new testModel(test)
        await newTest.save()
        let resOut = {
            testcode : await Functions.searchTest(req.body.mobile)
        }
        return resOut
        }
        catch(err){ 
            err.type ="error"
            return err
        }
    }
}