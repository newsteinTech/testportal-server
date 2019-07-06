import { Response, Request } from "express";
import *as jwt from "jsonwebtoken"; 
import { ActionType } from "../DataModel/action";
import { rolePermission } from "../DataModel/permission";

export class Authanticate{

    public static async Authanticate(req:any,res:Response,next:any){

        let token:any = req.header("Authorization");
        let decode:any;
        if(token == null){

            return res.status(401).send("Access Denied");

        }
        try{

            decode = await jwt.decode(token);
            req.user = decode;
            console.log(decode);
            next();

        }catch(err){

            return res.status(401).send("Bad Request, Access Denied");

        }


    }

    public static async Autharize(req:any,res:Response,action:ActionType){

        // console.log("From autharize. req.user.role = "+req);
        /*
        req.user.role = Authanticate.Role;
        console.log('BF token: '+req.user.role);
        let token:any = req.header("Authorization");
        let decode:any = await jwt.decode(token);
        res.send(decode);
        console.log(decode.email);
        */
        console.log(req.user.role);
        switch(req.user.role){
            
            case "Admin":{

                console.log("From admin switch.");
                let result = rolePermission.Admin.Permission.indexOf(action);
                if (result >= 0){

                    return true;

                }else{
                    console.log("From admin switch.");
                    return false;

                }

            }
            case "User":{

                console.log("From user switch.");
                let result = rolePermission.User.Permission.indexOf(action);
                if(result >=0 ){

                    return true;

                }else{

                    console.log("From user switch else.");
                   // return res.status(401).send("Access level insuffient.");
                    return false;
                }

            }
            default:{
                return res.status(401).send("Access level insuffient.");
            }
                
            

        }

    
    }
    

}