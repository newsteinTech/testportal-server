import { QuestionService } from "../services/questionService";
import{Request, Response} from "express";
import { Actiontype } from "../datamodels/actionType";
import { Authenticate } from "../middleware/authentication";

export class QuestionController{

    public async createQuestion(req: Request, res:Response, next: any){

        Authenticate.authorize(req, res, next, Actiontype.createQuestion)
        let result= await QuestionService.createQuestion(req);
        res.send(result);
    }

    public async updateQuestion(req: Request, res:Response, next: any){

        Authenticate.authorize(req, res, next, Actiontype.updateQuestion)
        let result= await QuestionService.updateQuestion(req);
        res.send(result);
    }

    public async deleteQuestion(req: Request, res:Response, next: any){

        Authenticate.authorize(req, res, next, Actiontype.deleteQuestion)
        let result= await QuestionService.deleteQuestion(req);
        res.send(result);
    }

    public async getAllQuestions(req: Request, res:Response, next:any){

        Authenticate.authorize(req, res, next, Actiontype.getAllQuestions)
        let result= await QuestionService.getAllQuestions(req);
        res.send(result);
    }

    public async getQuestionById(req: Request, res:Response, next:any){

        Authenticate.authorize(req, res, next, Actiontype.getQuestionById)
        let result= await QuestionService.getQuestionById(req);
        res.send(result);
    }
}