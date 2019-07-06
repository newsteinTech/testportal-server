import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    statement : {
        type : String,
        required : true
    },
    optionA : {
        type : String,
        required : true
    },
    optionB : {
        type : String,
        required : true
    },
    optionC : {
        type : String,
        required : true
    },
    optionD : {
        type : String,
        required : true
    },
    correctAnswer : {
        type : Number,
        enum : [0,1,2,3],
        required : true
    },
    code : {
        type : String,
    },
    createdDate : { 
        type : Date,
        default : Date.now()
    },
    active : {
        type : Boolean,
        default : true
    }
})

export const questionModel = mongoose.model("Question",questionSchema)