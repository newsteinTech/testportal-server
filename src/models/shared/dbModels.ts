import * as mongoose from 'mongoose';
import { Collections } from './collections';
import { TodoSchema } from '../demo/todoSchema';
import { QuestionSchema } from '../test/questionSchema';
import { TestSchema } from '../test/testSchema';
import { UserSchema } from '../userSchema';

export class DbModel {
    public static todoModel = mongoose.model(Collections.todoCollectionName, TodoSchema);
    public static questionModel = mongoose.model(Collections.questionCollectionName, QuestionSchema);
    public static testModel = mongoose.model(Collections.testCollectionName, TestSchema);
    public static userModel = mongoose.model(Collections.userCollectionName, UserSchema);
}