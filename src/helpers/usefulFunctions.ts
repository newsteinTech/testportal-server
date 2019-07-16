import {userModel} from "../models/userModel"
import {testModel} from "../models/test"
import {questionModel} from "..//models/question"

export class Functions {

    public static async searchUser(mobile:number){
        console.log(mobile)
        let result:any = await userModel.findOne({ "mobile" : mobile}).exec()
        console.log(result._id)
        return result._id
    }

    public static async searchTest(mobile:number){
        let result:any =await testModel.findOne({"mobile" : mobile,}).exec()
        console.log(result._id)
        return result._id
    }

    public static async getQuestion(index:number){
        console.log("get Question is called")
        try{
            let result:any = await questionModel.find().limit(1).skip(index+1).exec()
            console.log(result[0]._id)
            //console.log(result._id)
            return result[0]._id
        }catch(err){
            return err
        }
    }
}