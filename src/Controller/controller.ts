import { Request, Response } from "express";
import { User } from "../Services/services";

export class userController{

    public async register(req:Request,res:Response){

        console.log("TestCon");
        let result = await User.register(req,res);
        // res.send("Test Booked");
        res.send(result);

    }

}