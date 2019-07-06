import mongoose, { SchemaType, Schema } from 'mongoose';

export const userSchema = new mongoose.Schema({
    "email":{
        type:String,
        required:true,
    },
    "mobile":{
        type: String,
        required:true,
        unique:true
    },
    "name":{
        type:String,
        required:true
    },
    "role":{
        type:String,
        enum:['User','Admin'],
        default:'User'
    },
    "Created Date":{
        type:Date,
        default:Date.now
    }

})

export const testSchema = new mongoose.Schema({

    "code":{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    "mobile":{
        type:String,
        required:true
    },
    "questionId":String,
    "answer":Number

})

export const questionSchema = new mongoose.Schema({
    // "QuestionIndex":{
    //     type:String
    // }, Why Question Index????
    "Statement":{
        type:String
    },
    "Option A":{
        type:String
    },
    "Option B":{
        type:String
    },
    "Option C":{
        type:String
    },
    "Option D":{
        type:String
    },
    "Created At":{
        type:Date,
        default:Date.now
    },
    "CreatedBy":{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    "Code":{
        type:String
    },
    "Type":{
        enum:['C','JS','Apptitude']
    },
    "answer":{
        enum:[0,1,2,3],
        type:Number,
        required:true
    }
})

export const testUserSchema = new mongoose.Schema({

    "status":{
        type:String,
        enum:['created','started','completed','expired']
    },
    "questions":[{
        type:String
    }],
    "user":{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    "Answers":[{
        type:Number,
        enum:[0,1,2,3],
        default:-1
    }],
    "Score":{
        type:Number
    },
    "StartTime":{
        type:Date
    },
    "Created":{
        type:Date,
        default:Date.now
    },
    "Current Question":{
        type:Number,
    }

});

export let userModel = mongoose.model("user",userSchema);
export let testModel = mongoose.model("test",testSchema);
export let quesModel = mongoose.model("ques",questionSchema);
export let testUserModel = mongoose.model("userTest",testUserSchema);