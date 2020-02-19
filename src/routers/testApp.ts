import { Router } from 'express'
import { TestController } from '../controllers/testController';
import { Authenticate } from '../middlewares/authenticate';
import { Authorize } from '../middlewares/authorize';

export var testApp : Router = Router();
testApp.post('/book', TestController.book);
testApp.post('/start', TestController.start);
testApp.post('/submit', TestController.submit);

testApp.get('/sendMCQTestReminder/:_id', [Authenticate.auth, Authorize.authorize], TestController.getsendMCQTestReminder);
testApp.get('/', [Authenticate.auth, Authorize.authorize], TestController.getAll);
testApp.delete('/:_id', [Authenticate.auth, Authorize.authorize], TestController.remove);
testApp.get('/updateAllTest', [Authenticate.auth, Authorize.authorize], TestController.updateAllTestStatus);
testApp.get('/sendCodingInvitation/:_id', [Authenticate.auth, Authorize.authorize], TestController.sendCodingRoundInvitation);
testApp.get('/sendGenericInvitation/:_id', [Authenticate.auth, Authorize.authorize], TestController.sendGenericInvitation);