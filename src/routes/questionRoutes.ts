import { Router } from "express";
import { QuestionController } from "../controller/questionController";


export const questionRoutes: Router = Router();

let questionControllerObj = new QuestionController();

questionRoutes.post('/create', questionControllerObj.createQuestion)
questionRoutes.put('/update/:id', questionControllerObj.updateQuestion)
questionRoutes.get('/getAllQuestions', questionControllerObj.getAllQuestions)// only active questions find({active: true})
questionRoutes.get('/getQuestionById/:id', questionControllerObj.getQuestionById)
questionRoutes.put('/delete/:id', questionControllerObj.deleteQuestion)
