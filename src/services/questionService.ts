import { DbModel } from "../models/shared/dbModels";
import { ResponseModel } from "../dto/responseModel";
import { MongoErrorHandler } from "../helpers/mongoErrorHandler";
import { ModelHelper } from "../helpers/modelHelper";

export class QuestionService {
    public static async create(req) {
        try {
            let newQuestion = new DbModel.questionModel(req.body);
            await newQuestion.save();

            return ResponseModel.getValidResponse(newQuestion)
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async getAll(req) {
        try {
            let questions = await DbModel.questionModel.find().exec();
            return ResponseModel.getValidResponse(questions);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async get(req) {
        try {
            let question = await DbModel.questionModel.findById(req.params._id).exec();

            return ResponseModel.getValidResponse(question);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async update(req) {
        try {
            let question = await DbModel.questionModel.findById(req.body._id).exec();
            question = ModelHelper.updateFields(question, req.body)

            question.updatedAt = Date.now();
            await question.save();

            return ResponseModel.getValidResponse(question);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async remove(req) {
        try {
            let question = await DbModel.questionModel.deleteOne({ _id : req.params._id }).exec();

            return ResponseModel.getValidResponse(question);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }
}