import { Router } from "express";
import { UserController } from "../controllers/userController";
import { Authenticate } from "../middlewares/authenticate";
import { Authorize } from "../middlewares/authorize";

export const userApp: Router = Router();

// Express supports methods that correspond to all HTTP request methods: get, post, and so on.
userApp.post('/login', UserController.login);
userApp.post('/dummyLogin', UserController.dummyLogin);
userApp.post('/signup', UserController.signup);

userApp.get('/getUsers', [Authenticate.auth, Authorize.authorize], UserController.getTestUser);
userApp.post('/updateStatus', [Authenticate.auth, Authorize.authorize], UserController.updateStatus);
userApp.get('/sendInvitation/:_id', [Authenticate.auth, Authorize.authorize], UserController.sendInvitation);
//userApp.get('/sendInvitationToAll', [Authenticate.auth, Authorize.authorize], UserController.sendInvitationToAll);
