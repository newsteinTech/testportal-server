import * as http from "https";

export class SmsService {
    private static authKey: string = "<smsAuthKey>";

    public static sendNewTestNotif(name: string, phoneNumbers: string, code: string) {
      let msg: string = `Hi ${name}, Thanks for showing interest in Newstein's Special 26 Program. Your Aptitude Test for Special 26 is booked with Newstein. Test expires in 7 days. Use test code: ${code} to take the test http://ncat.in`;
      SmsService.sendSms(phoneNumbers, encodeURI(msg));
    }

    public static snedOldTestNotif(phoneNumbers: string, code: string, remainingDays: number) {
      let msg: string = `Test already booked with Newstein. Test expires in ${remainingDays} days. Use test code: ${code} to take the test http://ncat.in`;
      SmsService.sendSms(phoneNumbers, encodeURI(msg));
    }

    public static sendTestReminder(phoneNumbers: string, code: string, remainingDays: number) {
        let msg: string = `Your Special26 test will expire in ${remainingDays} days. Use test code: ${code} to take the test http://ncat.in`;
        SmsService.sendSms(phoneNumbers, encodeURI(msg));
    }

    public static sendCodingRoundInvitation(phoneNumbers: string) {
        let msg: string = `Congratulations! You have been shortlisted for coding round of Special 26. Please bring hard copy of your resume. Location: https://maps.app.goo.gl/UUwi6WNyzbCGKfZJ9`;
        SmsService.sendSms(phoneNumbers, encodeURI(msg));
    }

    public static sendGenericSpecial26Invite(name: string, phoneNumbers: string) {
      let msg: string = `Hi ${name}, Newstein invite you to attend `;
      SmsService.sendSms(phoneNumbers, encodeURI(msg));
  }
    

    private static sendSms(phoneNumbers: string, message: string): void {
        var options = {
            method: "GET",
            host: 'api.msg91.com',
            port: null,
            path: `/api/sendhttp.php?authkey=${SmsService.authKey}&mobiles=${phoneNumbers}&message=${message}&sender=<SENDER_NAME>&route=4&country=91`,
            headers: {}
          };

          // "https://api.msg91.com";
          
          var req = http.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          });
          
          req.end();
    }
}