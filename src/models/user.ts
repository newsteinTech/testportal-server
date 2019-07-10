import mongoose from "mongoose";

export const userSchema = new  mongoose.Schema({
    "name": String,
    "email": {type: String, required: true},
    "mobile": {type: String, required:true, unique: true},
    "role":{type: String, enum:["User", "Admin"], required: true },
    "testBookedDate": {type: Date, default: Date.now, required: true}
})

export let userModel= mongoose.model("userDetails", userSchema);