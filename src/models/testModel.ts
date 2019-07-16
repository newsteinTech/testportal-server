import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required:true
    },
    role : {
        type : String,
        enum : ["User","Admin"],
        default : "User"
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
})

export const testModel =  mongoose.model("Test",testSchema)