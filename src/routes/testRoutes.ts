import { Router } from "express";
import { TestController } from "../controller/testController";
import { Authenticate } from "../middleware/authentication";

export const testRoutes: Router = Router();

let testControllerObj = new TestController();

testRoutes.post('/bookTest', testControllerObj.bookTest)
testRoutes.post('/login', testControllerObj.login)
testRoutes.post('/startTest', Authenticate.authenticate, testControllerObj.startTest)
testRoutes.post('/generateTest', Authenticate.authenticate, testControllerObj.createTest)
testRoutes.post('/submit', Authenticate.authenticate, testControllerObj.submitAnswer)


