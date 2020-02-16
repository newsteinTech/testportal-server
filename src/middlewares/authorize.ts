import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { UserController } from '../controllers/userController';

export class Authorize {
    public static authorize(req: express.Request, res: express.Response, next: any) : void {
        // Authenticate
        try {
            if (!req.header("Authorization")) {
                return res.status(401).send("Access denied!"); 
            }

            next();
        } catch(err) {
            console.log(err);
            return res.status(401).send("Access denied!"); 
        }
    }
}