import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { UserController } from '../controllers/userController';

export class Authenticate {
    public static auth(req: express.Request, res: express.Response, next: any) : void {
        // Authenticate
        try {
            let token = req.header("Authorization");
            let decoded = jwt.verify(token, UserController.secretKey);
            req.user = decoded;

            next();
        } catch(err) {
            console.log(err);
            return res.status(401).send("Access denied!"); 
        }
    }
}