import {userModel} from "../models/userModel"
import {testModel} from "../models/test"

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
}