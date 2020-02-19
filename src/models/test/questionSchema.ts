import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const QuestionSchema = new Schema({
    // defaults
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,

    type: {type: String, enum: ["Aptitude", "C", "Javascript", "Programming"]},
    statement: { type: String, required: true },
    code: String,
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    answer: { type: Number, enum: [0,1,2,3]}
})