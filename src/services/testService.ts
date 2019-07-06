import { Request, Response } from "express";
import { userModel } from "../models/user";
import * as jwt from "jsonwebtoken";
import { ResponseModel } from "../helper/responseModel"
import { testModel } from "../models/test";
import { questionModel } from "../models/questions";
import * as nodemailer from "nodemailer";
import { exec } from "child_process";

export class TestService {

   public static async bookTest(req: Request) {
      try {
         let newUser = new userModel(req.body)
         await newUser.save();

         var code = newUser._id;

         // send email to user
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: 'soumya18goyal@gmail.com',
               pass: 'ekniwdydoscilslu' // app password configured for this device through google account
            }
         });

         let info = await transporter.sendMail({
            from: 'soumya18goyal@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "New Test Booked", // Subject line
            html: "<b>Kindly take the test within 7 days of registering, otherwise it will expire</b>" // html body
         });

         return ResponseModel.getValidResponse({ 'mobile': req.body.mobile, 'testCode': newUser._id });
      }
      catch (e) {
         console.log(e);
         return ResponseModel.getInvalidResponse(e);
      }

   }

   public static async login(req: Request) {

      try {
         let user: any = await userModel.findOne({ 'mobile': req.body.mobile }).exec();
         if (user) {
            //login success, then generate access token
            let signingOption: jwt.SignOptions = { expiresIn: "2h" };
            let secret = "secret";
            let payload = { 'email': user.email, 'name': user.name, 'userid': user._id, 'mobile': user.mobile, 'role': user.role };
            let accessToken = await jwt.sign(payload, secret, signingOption);
            return ({ 'accessToken': accessToken });

         }

         else {
            return ("Invalid User")
         }
      }
      catch (e) {
         console.log(e);
      }

   }

   public static async startTest(req: any) {

      try {

         // find the test for the user based on the code provided in the body
         let test: any = await testModel.findOne({ 'testTakenBy': req.body.code }).exec();

         //If user is taking test for the first time, generate a new test and link his code (userid) to that test in the database
         if (test == null) {
            let test: any = new testModel();
            test= await TestService.createTest();
            test.testTakenBy = req.body.code;
            test.testStatus = "started";
            await test.save();
            console.log(test);

            let q: any = await questionModel.findOne({ '_id': test.questionId[test.currentQuestion - 1] }).exec();

            return ResponseModel.getValidResponse({
            'testTakenBy': test.testTakenBy,
            'questionindex': test.currentQuestion, 'status': test.testStatus,
            'question': { 'questionid': q._id, 'statement': q.statement, 'optionA': q.optionA, 'optionB': q.optionB, 'optionC': q.optionC, 'optionD': q.optionD }
         })
         }
         //If user has already completed the test
         else if (test.testStatus == "completed") {
            return ("You have already taken the test")
         }

         console.log(test);

         // find the last question which the user was on(based on currentQuestion in the db) and send it in the response
         let q: any = await questionModel.findOne({ '_id': test.questionId[test.currentQuestion - 1] }).exec();

         return ResponseModel.getValidResponse({
            'testTakenBy': test.testTakenBy,
            'questionindex': test.currentQuestion, 'status': test.testStatus,
            'question': { 'questionid': q._id, 'statement': q.statement, 'optionA': q.optionA, 'optionB': q.optionB, 'optionC': q.optionC, 'optionD': q.optionD }
         })
      }
      catch (e) {
         console.log(e);
         return ResponseModel.getInvalidResponse(e);
      }

   }

   public static async submitOrSkipAnswer(req: any) {

      try {

         // find the test being taken by the user based on his code provided in the body
         let test: any = await testModel.findOne({ 'testTakenBy': req.body.code }).exec();
         //add his answer into the db
         test.answerSubmitted.push(req.body.answerSubmitted);
         await test.save();
         //console.log(test);

         //q1 is the question for which answer has been submitted, if answer matches the correctanswer, increment score
         let q1: any = await questionModel.findOne({ '_id': test.questionId[test.currentQuestion - 1] }).exec();
         if (test.answerSubmitted[test.currentQuestion - 1] == q1.correctAnswer) {
            test.score++;
         }

         //Move to next question
         test.currentQuestion++;

         //q is the question which will be sent in the next response
         if(test.currentQuestion<10){
         var q: any = await questionModel.findOne({ '_id': test.questionId[test.currentQuestion - 1] }).exec();
         }
         
         //if the currentQuestion exceeds 10, update the testStatus as completed
         if (test.currentQuestion <= 10) {
            test.testStatus = "started";
         }
         else {
            test.testStatus = "completed"
         }

         await test.save();

         return ResponseModel.getValidResponse({
            'testTakenBy': test.testTakenBy,
            'questionindex': test.currentQuestion, 'status': test.testStatus, 'score': test.score,
            'question': { 'questionid': q._id, 'statement': q.statement, 'optionA': q.optionA, 'optionB': q.optionB, 'optionC': q.optionC, 'optionD': q.optionD }
         })

      }
      catch (e) {
         console.log(e);
         return ResponseModel.getInvalidResponse(e);
      }

   }

   public static async createTest() {

      try {

         let newTest : any= new testModel();

         //gets all active questions from the questionDetails table in DB
         let questionBank: any[] = await questionModel.find({'active': true}).exec();

         //generates a random number from 1 to 11
         let n = Math.floor(Math.random() * (10) + 1)
         console.log(n);

         //adds the questionids of the questions starting from n to n+9 from qestionBank to newTest
         for (let i = 0; i < 10; i++) {
            let q: any = questionBank[n+i];
            newTest.questionId.push(q._id);
            await newTest.save();
           } 
            newTest.testStatus="created";
            newTest.score=0;
            newTest.currentQuestion=1;
            await newTest.save();
            return (newTest);
         }
      catch (e) {
            console.log(e);
         }
      }
}
