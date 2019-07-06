
import { Actiontype } from "./actionType";

export const rolePermissions = {
    "Admin":{
            "Permissions":[
                Actiontype.createTest,
                Actiontype.createQuestion,
                Actiontype.updateQuestion,
                Actiontype.deleteQuestion,
                Actiontype.getAllQuestions,
                Actiontype.getQuestionById,
            ] 
        },
    
    "User":{
            "Permissions":[
                Actiontype.submitAnswer
            ]
        }
}       
