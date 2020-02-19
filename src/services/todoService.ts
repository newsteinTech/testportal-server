import { DbModel } from "../models/shared/dbModels";
import { ResponseModel } from "../dto/responseModel";
import { MongoErrorHandler } from "../helpers/mongoErrorHandler";
import { ModelHelper } from "../helpers/modelHelper";

export class TodoService {

    public static async AddTodo(req) {
        try {
            let newTodo = new DbModel.todoModel(req.body);
            await newTodo.save();

            return ResponseModel.getValidResponse(newTodo)
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async getAll(req) {
        try {
            let todos = await DbModel.todoModel.find().exec();
            return ResponseModel.getValidResponse(todos);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async get(req) {
        try {
            let todo = await DbModel.todoModel.findById(req.params._id).exec();

            return ResponseModel.getValidResponse(todo);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async update(req) {
        try {
            let todo = await DbModel.todoModel.findById(req.body._id).exec();
            todo = ModelHelper.updateFields(todo, req.body)

            todo.updatedAt = Date.now();
            await todo.save();

            return ResponseModel.getValidResponse(todo);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async remove(req) {
        try {
            let todo = await DbModel.todoModel.deleteOne({ _id: req.params._id }).exec();

            return ResponseModel.getValidResponse(todo);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async dummy(req) {
        try {
            let todos = await DbModel.todoModel.find().exec();
            
            todos.forEach(async todo => {
                todo.isComplete = true;
                await todo.save();
            });

            return ResponseModel.getValidResponse(todos);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }
}