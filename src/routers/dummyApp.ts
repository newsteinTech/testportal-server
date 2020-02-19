import {Router } from 'express';
import { DummyController } from '../controllers/dummyController';

export const dummyApp : Router = Router();
dummyApp.post('/bookTest', DummyController.bookTest);
dummyApp.post('/AddPayment', DummyController.addPayment);
dummyApp.get('/GetAllTest', DummyController.getAllTest);
dummyApp.post('/GetTest', DummyController.getTest);
dummyApp.post('/StartTest', DummyController.startTest);
dummyApp.post('/SubmitTestAnswer', DummyController.submitTestAnswer);
dummyApp.post('/SubmitTestAnswer2', DummyController.submitTestAnswer2);
dummyApp.post('/submitTestAnswerFinal', DummyController.submitTestAnswerFinal);

//dummyApp.post('/bookTest', DummyController.bookTest);
