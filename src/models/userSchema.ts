import * as mongoose from 'mongoose';
import { ModelHelper } from '../helpers/modelHelper';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,

    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: ModelHelper.emailValidator,
            message: '{VALUE} is not a valid email id!'
        }
    },
    mobile: {
        type: String, 
        required: true,
        unique: true,
        validate: {
           validator: ModelHelper.mobileNumberValidator,
            message: '{VALUE} is not a valid phone number!'
        }
    },

    status: String,
    isDeleted: { type: Boolean, default: false },
    isInvalid: { type: Boolean, default: false }
})