import { TestStatus } from "./testStatus";

export class ModelHelper {
    
    public static TEST_EXPIRY_DAYS: number = 10;
    public static FIFTEEN_MIN_IN_MILI_SEC: number = 15 * 60 *1000;
    public static QUESTION_SCORE: number = 3;
    public static TEST_QUESTIONS_COUNT: number = 10;
    public static MINIMUM_SCORE_TO_QUALIFY = 6;

    public static testStatus: number[] = [
        TestStatus.CREATED,
        TestStatus.STARTED,
        TestStatus.COMPLETED,
        TestStatus.EXPIRED
    ];

    public static random(min: number, max: number): number {
        return min + ((Math.random() * 4583) % (max - min));
    }

    public static randomInt(min: number, max: number): number {
        let doudle = ModelHelper.random(min, max);

        return (doudle - (doudle % 1));
    }

    public static emailValidator(email){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    public static get invalidEmailMsg(): string {
        return '{VALUE} is not a valid email id!';
    }

    public static mobileNumberValidator(mobile) {
        return /^\d{10}$/.test(mobile);
    }

    public static get invalidMobileNumberMsg(): string {
        return '{VALUE} is not a valid mobile number!';
    }

    public static get secretKey(): string {
        return "secret key";
    }

    public static updateFields(source, destination) {
        for (var prop in destination) {
            if (prop == "_id" || prop == "__v" || prop == "createdAt") {
                continue;
            }

            if (destination.hasOwnProperty(prop)) {
                source[prop] = destination[prop];
            }
        }

        return source;
    }

    public static isTestExpired(testDate: Date): boolean {
        //Get 1 day in milliseconds
        var one_day: number = 1000*60*60*24;
      
        // Convert back to days and return
        return Math.round(ModelHelper.timeDiffInMiliSec(testDate)/one_day) > ModelHelper.TEST_EXPIRY_DAYS; 
    }

    public static remainingDays(testDate: Date) : number {
        //Get 1 day in milliseconds
        var one_day: number = 1000*60*60*24;
      
        // Convert back to days and return
        return ModelHelper.TEST_EXPIRY_DAYS - Math.round(ModelHelper.timeDiffInMiliSec(testDate)/one_day); 
    }
     
    public static isTimeOver(testStartDate: Date): boolean {
        if (testStartDate && ModelHelper.timeDiffInMiliSec(testStartDate) > ModelHelper.FIFTEEN_MIN_IN_MILI_SEC) {
            return true;
        }

        return false;
    }

    public static remainingTestTimeInSecond(startTime: Date): number {
        let difference = ModelHelper.timeDiffInMiliSec(startTime);

        return ModelHelper.FIFTEEN_MIN_IN_MILI_SEC/1000 - difference/1000;
    }

    private static timeDiffInMiliSec(date: Date): number {
        // Convert both dates to milliseconds
        var date1_ms: number = date.getTime();
        var date2_ms: number = Date.now();
      
        // Calculate the difference in milliseconds
        return date2_ms - date1_ms;
    }
}
