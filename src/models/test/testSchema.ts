import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';
import { ModelHelper } from '../../helpers/modelHelper';
import { TestStatus } from '../../helpers/testStatus';

const Schema = mongoose.Schema;

export const TestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: Collections.userCollectionName },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,

    paymentReference: String,
    
    batch: { type: Number, default: 0},
    status: { type: Number, enum: ModelHelper.testStatus, default: TestStatus.CREATED}, // TODO: Status PAID
    currentQuestion: { type: Number, default: 0},

    startTime: Date,
    score: { type: Number, default: 0},

    questions: [{ type: Schema.Types.ObjectId, required: true, ref: Collections.questionCollectionName }],
    answers: [{ type: Number, default: -1}]
})