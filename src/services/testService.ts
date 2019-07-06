import{Request, Response} from "express";
import { userModel } from "../models/user";
import * as jwt from "jsonwebtoken";
import { ResponseModel } from "../helper/responseModel"
import { testModel } from "../models/test";
import { questionModel } from "../models/questions";
import * as nodemailer from "nodemailer";

export class TestService{

   public static async bookTest(req: Request){
      try{
         let newUser= new userModel(req.body)
         await newUser.save();

         var code= newUser._id;

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

         return ResponseModel.getValidResponse({'mobile': req.body.mobile, 'testCode':newUser._id});
      }
      catch(e){
        console.log(e);
        return ResponseModel.getInvalidResponse(e);
      }

   }

   public static async login(req: Request){

      try{
         let user: any= await userModel.findOne({'mobile': req.body.mobile}).exec(); 
         if(user){
               //login success, then generate access token
               let signingOption: jwt.SignOptions= {expiresIn: "2h"};
               let secret ="secret";
               let payload= {'email': user.email, 'name': user.name, 'userid':user._id, 'mobile': user.mobile, 'role':user.role};
               let accessToken= await jwt.sign(payload, secret, signingOption);
               return ({'accessToken': accessToken});
                
            }

            else{
               return ("Invalid User")
            }
      }
      catch(e){
        console.log(e);
      }

   }

   public static async startTest(req:any){

      try{
        
         req.body.testTakenBy= req.user.userid;
         req.body.testStatus= "started";
         let test: any= await testModel.findOneAndUpdate({},req.body).exec();
         console.log(test);
         let q : any = await questionModel.findOne({'_id': test.questionId[test.currentQuestion-1]}).exec();

         return ResponseModel.getValidResponse({'testTakenBy': test.testTakenBy, 
         'questionindex': test.currentQuestion, 'status': test.testStatus,
         'question':{ 'questionid': q._id,'statement': q.statement,'optionA': q.optionA, 'optionB': q.optionB,'optionC': q.optionC, 'optionD': q.optionD}
        })
      }
      catch(e){
         console.log(e);
         return ResponseModel.getInvalidResponse(e);
      }
      
   }

   public static async submitAnswer(req: any){

      try{

         console.log(req.test)
         let test: any= await testModel.findOneAndUpdate({'testTakenBy': req.user.userid}, req.body).exec();
         console.log(test);
         //q1 is the question for which answer has been submitted, if answer matches the correctanswer, increment score
         let q1 : any = await questionModel.findOne({'_id': test.questionId[test.currentQuestion-1]}).exec();
         if(test.answerSubmitted[test.currentQuestion-1]==q1.correctAnswer){
            test.score++;
         }
         
         test.currentQuestion++;
         //q is the question which will be sent in the next response
         let q : any = await questionModel.findOne({'_id': test.questionId[test.currentQuestion-1]}).exec();

         if(test.currentQuestion<3){
            test.testStatus= "started";
         }
         else{
            test.testStatus= "completed"
         }       

         return ResponseModel.getValidResponse({'testTakenBy': test.testTakenBy, 
         'questionindex': test.currentQuestion, 'status': test.testStatus, 'score': test.score,
         'question':{ 'questionid': q._id,'statement': q.statement,'optionA': q.optionA, 'optionB': q.optionB,'optionC': q.optionC, 'optionD': q.optionD}
        })
        
      }
      catch(e){
         console.log(e);
         return ResponseModel.getInvalidResponse(e);
      }

   }

   public static async createTest(req: any){

   try{
      let newTest= new testModel(req.body);
      await newTest.save();
      return ResponseModel.getValidResponse(newTest);
   }
   catch(e){
      return ResponseModel.getInvalidResponse(e);
   }
   }
}
// don't let the user take another test