import { Router, Request, Response } from 'express';
import { TestCon } from "../Controller/testController";

export const testRoutes:Router = Router();
let testConObj = new TestCon();
testRoutes.post('/start',testConObj.startTest);
testRoutes.get("/try",(req:Request,res:Response)=>{

    res.send("It's Working.");

})
testRoutes.post('/create',testConObj.createQuestion);