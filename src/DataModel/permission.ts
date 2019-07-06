import { ActionType } from "./action";

export const rolePermission = {

    "Admin":{
        Permission: [
            ActionType.createQues,
            ActionType.deleateQues,
            ActionType.getQues,
            ActionType.updateQues
        ]
    },
    "User":{
        Permission:[
            ActionType.getQues
        ]
    }

}