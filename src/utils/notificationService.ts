//import { MailService } from "./mailService";
import { SmsService } from "./smsService";
import { ModelHelper } from "../helpers/modelHelper";
//import { HtmlMailService } from "./htmlMailService";

export class NotificationService {
    public static notifyNewTest(test, user): void {
        //HtmlMailService.sendNewTestMail(user.name, user.email, user.mobile, test._id);
        SmsService.sendNewTestNotif(user.name, user.mobile, test._id);
    }

    public static notifyOldTest(test, user): void {
        //MailService.sendOldTestEmail(user.name, user.email, user.mobile, test._id, ModelHelper.remainingDays(test.createdAt));
        SmsService.snedOldTestNotif(user.mobile, test._id, ModelHelper.remainingDays(test.createdAt));
    }

    public static sendTestReminder(test): void {
        //MailService.sendMCQReminderEmail(test.user.name, test.user.email, test.user.mobile, test._id, ModelHelper.remainingDays(test.createdAt));
        SmsService.sendTestReminder(test.user.mobile, test._id, ModelHelper.remainingDays(test.createdAt));
    }

    public static sendCodingInvitation(test): void {
        //MailService.sendInvitationForCodingRound(test.user.name, test.user.email);
        SmsService.sendCodingRoundInvitation(test.user.mobile);
    }

    public static sendGenericSpecial26Invite(user): void {
        //HtmlMailService.sendGenericSpecial26Invite(user.name, user.email);
        SmsService.sendGenericSpecial26Invite(user.name, user.mobile);
    }
}