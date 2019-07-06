import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken'
import { rolePermissions } from "../datamodels/permissions";
import { Actiontype } from "../datamodels/actionType";

export class Authenticate{

public static async authenticate(req:any, res:Response, next:any){
    let token: any= req.header("Authorization")

    if(token==null){
       return res.status(401).send("Access denied");
    }

    try{
        let decodedToken= await jwt.verify(token,"secret");
        console.log(decodedToken);
        req.user= decodedToken; next();
    }
    catch(error){
        res.status(401).send("Bad Request, access denied");
    }
 }

 public static authorize(req:any , res:Response, next: any, action: Actiontype){

    switch(req.user.role){
        case "Admin":
            let result= rolePermissions.Admin.Permissions.indexOf(action)
            if(result>=0){
                return true;
            
            }
            else{
              return res.status(401).send("You don't have permissions to perform this action")
            }
        
        case "User":
            let result2= rolePermissions.User.Permissions.indexOf(action)
            if(result2>=0){
                return true;
                
            }
            else{
                return res.status(401).send("You don't have permissions to perform this action")
            }
            
        default:
            return res.status(401).send("You don't have permissions to perform this action")
    }

  }
}