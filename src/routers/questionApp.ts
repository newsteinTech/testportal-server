import * as express from "express";
import { QuestionController } from "../controllers/questionController";

export const questionApp: express.Router = express.Router();
questionApp.post('/create', QuestionController.create);
questionApp.get('/',QuestionController.getAll);
questionApp.get('/:_id',QuestionController.get);
questionApp.put('/',QuestionController.update);
questionApp.delete('/:_id',QuestionController.remove); 

/*

express.Router
Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware 
and routing system; for this reason, it is often referred to as a “mini-app”.


cardRoutes.post('/create',cardController.addNewCard);
cardRoutes.get('/',cardController.getCards);
cardRoutes.get('/:cardId',cardController.getCardWithID);
cardRoutes.put('/:cardId',cardController.updateCard);
cardRoutes.delete('/:cardId',cardController.deleteCard); 
*/