import { Router } from "express";
import { TestController } from "../controller/testController";
import { Authenticate } from "../middleware/authentication";

export const testRoutes: Router = Router();

let testControllerObj = new TestController();

testRoutes.post('/bookTest', testControllerObj.bookTest)
testRoutes.post('/admin/login', testControllerObj.login)
testRoutes.post('/startTest', testControllerObj.startTest)
testRoutes.post('/submit', testControllerObj.submitOrSkipAnswer)


