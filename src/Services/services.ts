import { Request, Response } from "express";
import { userModel } from "../Model/testModel";
import { responseModel } from "../Helper/helper";
import *as jwt from 'jsonwebtoken';

export class User{

    public static async register(req:Request,res:Response){
        

        try{
            let newBooking:any = new userModel(req.body);
            await newBooking.save();

            let signInOption: jwt.SignOptions = {

                'expiresIn':'12h'

            }

            let secret = 'secret';

            let payLoad = {

                "email":req.body.email,
                "name":req.body.name,
                "mobile":req.body.mobile,
                "role":newBooking.role,
                "id":newBooking._id
                
            }

            let Token = await jwt.sign(payLoad,secret,signInOption);

            return responseModel.getValidResponse({

                "TestCode":newBooking._id,
                "mobile":req.body.mobile,
                "token":Token
            
            });
        }catch(err){
            console.log(err);
        }
        
    }

}
