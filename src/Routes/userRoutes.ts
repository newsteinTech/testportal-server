import { Router, Request, Response } from "express";
import { userController } from "../Controller/controller";

export const userRoutes:Router = Router();
let userConObj = new userController();
// console.log("Test");
userRoutes.post('/register',userConObj.register);
userRoutes.get("/try",(req:Request,res:Response)=>{
    res.send("Hello");
})