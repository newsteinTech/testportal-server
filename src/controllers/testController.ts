import { Request, Response } from 'express';
import { TestService } from '../services/testService';

export class TestController {
    public static async book(req: Request, res: Response) {
        let response = await TestService.book(req);
        return res.send(response);
    }

    public static async start(req: Request, res: Response) {
        let response = await TestService.start(req);
        return res.send(response);
    }

    public static async submit(req: Request, res: Response) {
        let response = await TestService.submitAnswer(req);
        return res.send(response);
    }

    public static async getsendMCQTestReminder(req: Request, res: Response) {
        let response = await TestService.sendMCQTestReminder(req);
        return res.send(response);
    }
    
    public static async getAll(req: Request, res: Response) {
        let response = await TestService.getAll(req);
        return res.send(response);
    }

    public static async remove(req: Request, res: Response) {
        let response = await TestService.remove(req);
        return res.send(response);
    }

    public static async updateAllTestStatus(req: Request, res: Response) {
        let response = await TestService.updateAllTestStatus(req);
        return res.send(response);
    }

    public static async sendCodingRoundInvitation(req: Request, res: Response) {
        let response = await TestService.sendCodingRoundInvitation(req);
        return res.send(response);
    }

    public static async sendGenericInvitation(req: Request, res: Response) {
        let response = await TestService.sendGenericInvitation(req);
        return res.send(response);
    }
}