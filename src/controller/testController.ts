import { TestService } from "../services/testService";
import{Request, Response} from "express";
import { Authenticate } from "../middleware/authentication";
import { Actiontype } from "../datamodels/actionType";

export class TestController{

    public async bookTest(req: Request, res:Response){

        let result= await TestService.bookTest(req); 
        res.send(result);

    }

    public async login(req: Request, res:Response){
    
        let result= await TestService.login(req); 
        res.send(result);
    }

    public async startTest(req: Request, res:Response, next: any){
    
        let result= await TestService.startTest(req); 
        res.send(result);
    }

    public async submitOrSkipAnswer(req:Request, res:Response, next:any){

        //Authenticate.authorize(req, res, next, Actiontype.submitAnswer)
        let result= await TestService.submitOrSkipAnswer(req); 
        res.send(result);
    }

    /*public async createTest(req: Request, res:Response, next: any){
    
        let result= await TestService.createTest(); 
        res.send(result);
    }*/
}