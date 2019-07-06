import { Request, Response } from 'express';
import { TestSer } from "../Services/testService";
import { Authanticate } from '../Middleware/authantication';
import { ActionType } from '../DataModel/action';

export class TestCon{

    public async startTest(req:Request,res:Response){

        Authanticate.Autharize(req,res,ActionType.getQues);
        console.log('Hi from start con');
        let result = await TestSer.start(req);
        res.send(result);

    }

    public async createQuestion(req:Request,res:Response){

        let checkPermission = await Authanticate.Autharize(req,res,ActionType.createQues);
        console.log("CHPer "+checkPermission );
        if(checkPermission == true){
            let result = await TestSer.createQuestion(req);
            res.send(result);
        }else{
            res.status(401).send("Access level insufficent.");
        }
    
    }

}