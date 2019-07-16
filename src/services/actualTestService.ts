import {Request} from "express"
import {testModel} from "../models/test"
import  {Functions} from "../helpers/usefulFunctions"

export class actualTestService {

    public static async create(req:Request){
        //return "Create Test Called"
        try
        {
        let test = {
            user : await Functions.searchUser(req.body.mobile),
            paymentRef : req.body.paymentRef
        }
        console.log(test)
        let newTest = new testModel(test)
        await newTest.save()
        let resOut = {
            testcode : await Functions.searchTest(req.body.mobile)
        }
        return resOut
        }
        catch(err){ 
            err.type ="error"
            return err
        }
    }

    public static async start(req:Request){

        try{
            console.log("Service is called")
            let data:any = await testModel.findById(req.body.code).exec()
            console.log(data)
            //let questionId = await Functions.getQuestion(data.currentQuestion)
            switch (data.status)
            {
                case  "Created" : {
                    let updateData = {
                        status : "Started",
                        updatedAt : Date.now(),
                        startTime : Date.now(),
                    }
                    await testModel.findByIdAndUpdate(req.body.code,updateData,{"new" : true}).exec()
                    console.log("First update done")
                    let questionId = await Functions.getQuestion(data.currentQuestion)
                    await testModel.findByIdAndUpdate(req.body.code,{ $push : {"questions": questionId}},{ "new": true, "upsert": true }).exec()
                    console.log("Second update done")
                    let Result:any = await testModel.findById(req.body.code).populate("questions").exec()
                    let resOut = {
                        "status" :  Result.status,
                        "questionIndex" : Result.currentQuestion,
                        "remainingTime" : Date.now() - Result.startTime,
                        "question" : {
                            "_id" : Result.questions[Result.currentQuestion]._id,
                            "statement" : Result.questions[Result.currentQuestion].statement,
                            "optionA" : Result.questions[Result.currentQuestion].optionA,
                            "optionB" : Result.questions[Result.currentQuestion].optionB,
                            "optionC" : Result.questions[Result.currentQuestion].optionC,
                            "optionD" : Result.questions[Result.currentQuestion].optionD,
                        }
                    }
                    return resOut
                }

                case  "Started" : {
                    let updateData = {
                        updatedAt : Date.now(),
                    }
                    await testModel.findByIdAndUpdate(req.body.code,updateData,{"new" : true}).exec()
                    console.log("First update done")
                    let questionId = await Functions.getQuestion(data.currentQuestion)
                    await testModel.findByIdAndUpdate(req.body.code,{ $push : {"questions": questionId}},{ "new": true, "upsert": true }).exec()
                    console.log("Second update done")
                    let Result:any = await testModel.findById(req.body.code).populate("questions").exec()
                    //let question = Result.questions[Result.currentQuestion]
                    let resOut = {
                        "status" :  Result.status,
                        "questionIndex" : Result.currentQuestion,
                        "remainingTime" : Date.now() - Result.startTime,
                        "question" : {
                            "_id" : Result.questions[Result.currentQuestion]._id,
                            "statement" : Result.questions[Result.currentQuestion].statement,
                            "optionA" : Result.questions[Result.currentQuestion].optionA,
                            "optionB" : Result.questions[Result.currentQuestion].optionB,
                            "optionC" : Result.questions[Result.currentQuestion].optionC,
                            "optionD" : Result.questions[Result.currentQuestion].optionD,
                        }
                    }
                    return resOut
                }

                case  "Expired" : {
                    return "Sorry, Test is Expired"
                }
                case  "Completed" : {
                    return "Test is Completed!!"
                }
            }
            
        }catch(err){ 
            err.type ="error"
            return err
        }
        
    }

    public static async submit(req:Request){
        
        try{
            let data:any = await testModel.findById(req.body.code).exec()
            let updateData = {
                updatedAt : Date.now(),
                currentQuestion : data.currentQuestion + 1
            }
            await testModel.findByIdAndUpdate(req.body.code,updateData,{"new" : true}).exec()
            console.log("First update done")
            let questionId = await Functions.getQuestion(data.currentQuestion+1)
            await testModel.findByIdAndUpdate(req.body.code,{ $push : {"questions": questionId}},{ "new": true, "upsert": true }).exec()
            console.log("Second update done")
            await testModel.findByIdAndUpdate(req.body.code,{ $push : {"answers": req.body.answer}},{ "new": true, "upsert": true }).exec()
            console.log("Third update done")
            let Result:any = await testModel.findById(req.body.code).populate("questions").exec()
                    //let question = Result.questions[Result.currentQuestion]
                    let resOut = {
                        "status" :  Result.status,
                        "questionIndex" : Result.currentQuestion,
                        "remainingTime" :  Date.now() - Result.startTime,
                        "question" : {
                            "_id" : Result.questions[Result.currentQuestion]._id,
                            "statement" : Result.questions[Result.currentQuestion].statement,
                            "optionA" : Result.questions[Result.currentQuestion].optionA,
                            "optionB" : Result.questions[Result.currentQuestion].optionB,
                            "optionC" : Result.questions[Result.currentQuestion].optionC,
                            "optionD" : Result.questions[Result.currentQuestion].optionD,
                        }
                    }
                    return resOut
        }
        catch(err){
            err.type ="error"
            return err
        }
    }

}