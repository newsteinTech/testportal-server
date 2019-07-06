import { Request } from 'express';
import { testModel, quesModel, testUserModel } from "../Model/testModel";
import { responseModel } from "../Helper/helper";

export class TestSer{

    public static async start(req:any){

        try{

            req.body.code = req.user.id; 
            let newTest:any = new testModel(req.body);
            await newTest.save();
            let createTest:Array<any>=[];
            
            for(let i = 0;i<6;i++){
                let random = Math.floor(Math.random()*4);
                
                createTest.push(await quesModel.find().skip(random).limit(1));

            };
            let uniqueArray:any = [];
            for(let i=0; i<createTest.length;i++){

                if(uniqueArray.indexOf(createTest[i]) == -1){
                    uniqueArray.push(createTest[i]);
                }

            }
            console.log(uniqueArray);

            req.body.questions = uniqueArray;
            let newTestUser = new testUserModel(req.body);
            await newTestUser.save();
            
            return responseModel.getValidResponse({

                "mobile":newTest.mobile,
                "code":newTest.code,
                "testQuestion":uniqueArray

            });

        }catch(err){

            return responseModel.getInvalidResponse(err);

        }

    }

    public static async createQuestion(req:any){

        try{

            req.body.CreatedBy = req.user.id;
            let newQuestion:any = new quesModel(req.body);
            await newQuestion.save();
            return responseModel.getValidResponse(newQuestion);

        }catch(err){

            return responseModel.getInvalidResponse(err);

        }

    }

}