import { DbModel } from "../models/shared/dbModels";
import { ResponseModel } from "../dto/responseModel";
import { MongoErrorHandler } from "../helpers/mongoErrorHandler";
import { NotificationService } from "../utils/notificationService";

export class UserService {
    public static async getTestUser(req) {
        try {
            let users = await DbModel.userModel.find({isDeleted: false, isInvalid: false}).exec();

            return ResponseModel.getValidResponse(users);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async sendInvitationToAll(req) {
        try {
            let users = await DbModel.userModel.find({isDeleted: false, isInvalid: false}).exec();

            for (let user of users) {
                if (user && !user.isInvalid && !user.isDeleted) {
                    NotificationService.sendGenericSpecial26Invite(user);
                }
            }

            return ResponseModel.getValidResponse("Notification sent!");
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async sendInvitation(req) {
        try {
            let user = await DbModel.userModel.findById(req.params._id).exec();

            if (user && !user.isInvalid && !user.isDeleted) {
                NotificationService.sendGenericSpecial26Invite(user);
                return ResponseModel.getValidResponse("Notification sent!");
            }

            return ResponseModel.getInvalidResponse(["User not found or valid"]);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }

    public static async updateStatus(req) {
        try {
            let user = await DbModel.userModel.findById(req.body._id).exec();

            user.status = req.body.status;
            user.isInvalid = req.body.isInvalid;
            await user.save();

            return ResponseModel.getValidResponse(user);
        } catch (err) {
            return MongoErrorHandler.handleError(err);
        }
    }
}