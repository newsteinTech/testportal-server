import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken';
import { UserModel } from '../models/shared/userModel';
import { ResponseModel } from '../dto/responseModel';
import { UserService} from '../services/userService';

export class UserController {
    public static secretKey: string = "secret";
    private static user: UserModel;

    public static async login(req: Request, res: Response) {
        // Generate Token
        // Dummy login logic ...chnage it
        if (!req.body.mobile || !req.body.password) {
            return res.send(ResponseModel.getInvalidResponse(["Either username or password is wrong"]));
        }

        let token = jwt.sign(req.body, UserController.secretKey, { expiresIn: '1h' } );
        return  res.send(ResponseModel.getValidResponse(token));
    }

    public static async dummyLogin(req: Request, res: Response) {
        // Generate Token
        // Dummy login logic ...chnage it
        if (!req.body.mobile || !req.body.password) {
            return res.send(ResponseModel.getInvalidResponse(["Either username or password is wrong"]));
        }

        let token = jwt.sign(req.body, UserController.secretKey, { expiresIn: '1h' } );
        return  res.send(ResponseModel.getValidResponse(token));
    }

    public static async signup(req: Request, res: Response) {
        // check user
        if (UserController.user != null) {
            return res.send(ResponseModel.getInvalidResponse(["Not Implemented"]));
        }
    }

    public static async getTestUser(req: Request, res: Response) {
        let response = await UserService.getTestUser(req);
        return res.send(response);
    }
    
    public static async sendInvitation(req: Request, res: Response) {
        let response = await UserService.sendInvitation(req);
        return res.send(response);
    }
    
    public static async updateStatus(req: Request, res: Response) {
        let response = await UserService.updateStatus(req);
        return res.send(response);
    }

    public static async sendInvitationToAll(req: Request, res: Response) {
        let response = await UserService.sendInvitationToAll(req);
        return res.send(response);
    }
}