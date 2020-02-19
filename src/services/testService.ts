import { Request, Response } from 'express'
import { MongoErrorHandler } from '../helpers/mongoErrorHandler';
import { DbModel } from '../models/shared/dbModels';
import { ResponseModel } from '../dto/responseModel';
import { ModelHelper } from '../helpers/modelHelper';
import { TestStatus } from '../helpers/testStatus';
import { TestDTO } from '../dto/testDto';
import { NotificationService } from '../utils/notificationService';

export class TestService {
    // Idempotent request
    // req: { name: "", mobile: "", email: ""}
    public static async book(req: Request) {
        try {
            // Check for new user. TODO: Handle email id Update scenario
            let user = await DbModel.userModel.findOne({ mobile: req.body.mobile }).exec();
            if (user == null) {
                user = new DbModel.userModel(req.body);
                await user.save();
            } else {
                // Check if email changed
                if (user.email != req.body.email) {
                    user.email = req.body.email;
                    await user.save();
                }

                // Check active test assigned to user
                let activeTests = await TestService.getAllActiveTests(user); // {status: { $ne: 'EXPIRED'}}
                if (activeTests && activeTests.length > 0) {
                    NotificationService.notifyOldTest(activeTests[0], user);
                    return ResponseModel.getInvalidResponse([`Already test ${activeTests[0]._id} is created for ${user.name}`]);
                }
            }

            // Create test
            let newTest = new DbModel.testModel();
            newTest.batch = -1; // For batch 2
            newTest.user = user; // set users
            await newTest.save();

            NotificationService.notifyNewTest(newTest, user);

            return ResponseModel.getValidResponse(newTest._id);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    // Idempotent request
    // req: { mobile: "", code: ""}
    public static async start(req) {
        try {
            // Get tests. Authenticate user
            let test = await DbModel.testModel.findById(req.body.code).populate({ path: 'user', select: 'name mobile' }).exec();
            if (!test || test.user.mobile != req.body.mobile) {
                return ResponseModel.getInvalidResponse(['Either mobile number or test code is incorrect!']);
            }

            // Check for Complete or Expired Status
            await TestService.checkCompleteOrExpiredTestAndUpdate(test);
            if (test.status == TestStatus.COMPLETED || test.status == TestStatus.EXPIRED) {
                return ResponseModel.getInvalidResponse([`The test is over or expired!`]);
            }

            // Start Test. Assign Questions.
            if (test.status == TestStatus.CREATED) {
                // Random logic
                let count = await DbModel.questionModel.count().exec();
                let random = ModelHelper.randomInt(0, count - 10);

                test.questions = await DbModel.questionModel.find({ type: 'Aptitude' })
                    .skip(random)
                    .limit(ModelHelper.TEST_QUESTIONS_COUNT)
                    .exec(); // TODO: Get random 10 questions. USE SKIP?

                test.answers = [];
                test.status = TestStatus.STARTED;
                test.startTime = Date.now();
                test.updatedAt = Date.now();
                await test.save();
            }

            let question = await DbModel.questionModel.findById(test.questions[test.currentQuestion]).exec();
            test.question = question;

            return ResponseModel.getValidResponse(new TestDTO(test));
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }

    }

    // Idempotent
    // req: { mobile: "", code: "", questionId: "", answer: -1}
    public static async submitAnswer(req) {
        try {
            // Get tests. Authenticate user
            let test = await DbModel.testModel.findById(req.body.code).populate({ path: 'user', select: 'name mobile' }).exec();
            if (!test || test.user.mobile != req.body.mobile) {
                return ResponseModel.getInvalidResponse(['Either mobile number or test code is incorrect!']);
            }

            if (test.status != TestStatus.STARTED) {
                return ResponseModel.getInvalidResponse(['Bad Request! Test has not started.']);
            }

            // Verify idempotency. Verify Test current question with requested question
            if (test.questions[test.currentQuestion] != req.body.questionId) {
                return ResponseModel.getInvalidResponse(['Bad Request! Question already answered.']);
            }

            // Check for timeout
            if (test.status == TestStatus.STARTED && ModelHelper.isTimeOver(test.startTime)) {
                test.status = TestStatus.COMPLETED;
                test.updatedAt = Date.now();
                await test.save();

                return ResponseModel.getValidResponse(new TestDTO(test));
            }

            // Capture answer. Calculate score. Goto next question
            let question = await DbModel.questionModel.findById(test.questions[test.currentQuestion]).exec();
            console.log(question);
            if (question.answer == req.body.answer) {
                test.score += ModelHelper.QUESTION_SCORE;
            }

            test.answers.push(req.body.answer);
            test.currentQuestion += 1;
            await test.save();
            
            // Check if all questions attempted
            if (test.currentQuestion >= ModelHelper.TEST_QUESTIONS_COUNT) {
                test.status = TestStatus.COMPLETED;
                test.updatedAt = Date.now();
                await test.save();

                return ResponseModel.getValidResponse(new TestDTO(test));
            }

            let nextQuestion = await DbModel.questionModel.findById(test.questions[test.currentQuestion]).exec();
            test.question = nextQuestion;

            return ResponseModel.getValidResponse(new TestDTO(test));
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async getAll(req) {
        try {
            let tests = await DbModel.testModel.find().populate({ path: 'user'}).exec();
            return ResponseModel.getValidResponse(tests);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async sendMCQTestReminder(req) {
        try {
            let test = await DbModel.testModel.findById(req.params._id).populate({ path: 'user'}).exec();
            NotificationService.sendTestReminder(test);

            return ResponseModel.getValidResponse(null);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async remove(req) {
        try {
            let test = await DbModel.testModel.deleteOne({ _id: req.params._id, status: { $in: [TestStatus.COMPLETED, TestStatus.EXPIRED]} }).exec();

            return ResponseModel.getValidResponse(test);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async getAllDummy(req) {
        try {
            //console.log(new Date('2019-6-23'));
            let tests = await DbModel.testModel.find({createdAt: {"$lte": new Date('2019-09-01')}}).populate({path: 'user'}).exec();
            
            //{"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}
            // 
            for (let test of tests) {
                test.batch = 0;
                await test.save();
            }
            
            return ResponseModel.getValidResponse(tests);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async updateAllTestStatus(req) {
        try {
            // Check and Update for Expired  and Timeout ones
            let tests = await DbModel.testModel.find({status: { $nin: [TestStatus.COMPLETED, TestStatus.EXPIRED]}});
            for (let test of tests) {
                await TestService.checkCompleteOrExpiredTestAndUpdate(test);
            }

            return ResponseModel.getValidResponse("All tests Status updated!");
        } catch (err) {
            MongoErrorHandler.handleError(err);
            return null;
        }
    }

    public static async sendCodingRoundInvitation(req) {
        try {
            let test = await DbModel.testModel.findById(req.params._id).populate({ path: 'user'}).exec();
            
            if (test.status == TestStatus.COMPLETED && test.score >= ModelHelper.MINIMUM_SCORE_TO_QUALIFY) {
                NotificationService.sendCodingInvitation(test);
                return ResponseModel.getValidResponse("Invotation Sent!");
            } else {
                return ResponseModel.getInvalidResponse("Test is not completed or score is low");
            }
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async sendGenericInvitation(req) {
        try {
            let test = await DbModel.testModel.findById(req.params._id).populate({ path: 'user'}).exec();
            
            NotificationService.sendGenericSpecial26Invite(test.user);
            return ResponseModel.getValidResponse("Invotation Sent!");
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    private static async getAllActiveTests(user) {
        try {
            // Check and Update for Expired  and Timeout ones
            let tests = await DbModel.testModel.find({user: user, status: { $nin: [TestStatus.COMPLETED, TestStatus.EXPIRED]}});
            for (let test of tests) {
                await TestService.checkCompleteOrExpiredTestAndUpdate(test);
            }

            return await DbModel.testModel.find({user: user, status: { $nin: [TestStatus.COMPLETED, TestStatus.EXPIRED]}});
        } catch (err) {
            MongoErrorHandler.handleError(err);
            return null;
        }
    }

    private static async checkCompleteOrExpiredTestAndUpdate(test) {
        if (test.status == TestStatus.CREATED && ModelHelper.isTestExpired(test.createdAt)) {
            test.status = TestStatus.EXPIRED;
            await test.save();
        } else if (test.status == TestStatus.STARTED && ModelHelper.isTimeOver(test.startTime)) {
            test.status = TestStatus.COMPLETED;
            await test.save();
        }
    }
}


/*

// Get the count of all users
User.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  User.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      console.log(result)
    })
})

*/