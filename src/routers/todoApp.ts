
import { Request, Response, Router } from "express";
import { TodoController } from "../controllers/todoController";
import { Authenticate } from "../middlewares/authenticate";
// import { CardController} from './../controllers/cardController'

// const cardController: CardController = new CardController();

export const todoApp: Router = Router();

// Express supports methods that correspond to all HTTP request methods: get, post, and so on.
todoApp.post('/create',TodoController.create);
todoApp.get('/', TodoController.getAll);
todoApp.get('/:_id',TodoController.get);
todoApp.put('/',TodoController.update);
todoApp.delete('/:_id',TodoController.remove); 


// todoApp.get('/dummy',TodoController.dummy); 



//cardRoutes.post('/create',cardController.addNewCard);
//cardRoutes.get('/',cardController.getCards);

/*
Route parameters

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. 
The captured values are populated in the req.params object, with the name of the route parameter specified in the path 
as their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

//cardRoutes.get('/:cardId',cardController.getCardWithID);
//cardRoutes.put('/:cardId',cardController.updateCard);
//cardRoutes.delete('/:cardId',cardController.deleteCard); 
