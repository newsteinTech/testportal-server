import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {Request} from "express"
import { userModel } from "../models/userModel";

export class userService {
    
    public static async loginUser(req:any){
        try{
            let user:any = await userModel.findOne({"email":req.body.email})
            if(user)
            {
                let isPasswordMatch = await bcrypt.compare(req.body.password,user.password)
                if(isPasswordMatch)
                {
                    let signingOption:jwt.SignOptions = {
                        expiresIn : "12h"
                    }
                    let secret = "secret"
                    let payload = {
                        "email" : user.email,
                        "name" : user.name,
                        "role" : user.role,
                        "userId" : user._id
                    }
                    let accessToken = await jwt.sign(payload,secret,signingOption)
                    return {"accessToken" : accessToken}                    
                }
                else
                {
                    return "Password is incorrect"
                }
            }
            else{
                return "User does not exist"
            }
        }catch(err){
            console.error(err)
        }
    }

    public static async signUpUser(req:Request){
        try{
            let hasPassword = await bcrypt.hash(req.body.password,12)
            console.log(hasPassword)
            req.body.password = hasPassword
            let newUser =  new userModel(req.body)
            await newUser.save()
            return "Sign Up Is successful"
        }catch(err)
        {
            return err
        }
    }

}