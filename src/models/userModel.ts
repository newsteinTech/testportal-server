import mongoose from "mongoose"

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required: true,
        unique : true
    },
    role : {
        type : String,
        enum : ["User","Admin"],
        default : "User"
    },
    createdDate : {
        type : Date,
        default : Date.now()
    },
    active : {
        type : Date,
        default : Date.now()
    }
})

export const userModel = mongoose.model("User",userSchema)