import mongoose, { Schema } from "mongoose";

export const testSchema = new  mongoose.Schema({
    "testTakenBy": {
        type: Schema.Types.ObjectId, 
        ref:'userDetails'
    },
    "testStatus": {
        type: String, 
        enum:["created", "started", "completed", "expired"]// expired when test is not taken within 7 days of registering
    }, 
    "questionId": [{
        type: Schema.Types.ObjectId,
        ref: 'questionDetails', 
        required: true
    }],
    "answerSubmitted": [{
        type: Number, 
        enum:[-1,0,1,2,3],
        default: -1
    }],
    "startTime": {
        type: Date, 
        default: Date.now
    },
    "score": {
        type: Number
    },
    "paymentRef": String,
    "currentQuestion": {
        type: Number, 
        //required: true
    }
})

export let testModel= mongoose.model("testDetails", testSchema);