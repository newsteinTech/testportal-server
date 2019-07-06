import {Request,Response} from "express"
import jwt from "jsonwebtoken"

export class Authentication { 
    public static async authenticate(req:any,res:Response,next:any){
        
        let token:any = req.header("Authorization")
            if(token == null)
            {
                res.status(401).send("Access Denied, Please login to access this")
                return
            }
            try{
                let decodedToken:any = await jwt.verify(token,"secret")
                console.log(decodedToken)
                if (decodedToken.role == "Admin"){
                    next()
                }
                else{
                    res.status(401).send("Access Denied")
                }
            }catch(err){
                console.log(err)
                res.status(401).send("Bad Request, Access Denied")
            }
    }
}