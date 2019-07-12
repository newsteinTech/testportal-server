import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
    createdAt :{
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
    },
    status : {
        type : String,
        enum : ["Created","Started","Expired","Completed"],
        default : "Created"
    },
    questions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    }],
    startTime : {
        type : Date
    },
    answers : [{
        type : Boolean,
    }],
    score : {
        type : Number,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    paymentRef : {
        type : String,
        required : true
    },
    currentQuestion : {
        type : Number,
        required : true,
        default : 0
    }
})

export let testModel = mongoose.model("actualTest",testSchema)