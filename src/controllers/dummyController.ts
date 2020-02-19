import {Request, Response} from 'express';

export class DummyController {
    public static bookTest(req: Request, res: Response) {
        return res.send({
            "UserId": 1,
            "TestId": 3,
            "CreatedAt": "2018-04-29T11:04:56.1193426+05:30",
            "UpdatedAt": "2018-04-29T11:04:56.1193426+05:30",
            "PaymentReference": null,
            "User": {
                "Name": "Gaurav",
                "Mobile": "8297236375",
                "Email": "gaurav9939@gmail.com",
                "Id": 1,
                "CreatedAt": "2018-04-05T22:14:47.17",
                "UpdatedAt": "2018-04-05T22:14:47.17"
            },
            "Test": {
                "Code": "568c3951-46b1-4e61-ab26-20b3224bf8f2",
                "Status": 0,
                "CurrentQuestion": 0,
                "StartTime": "2018-04-29T11:04:55.703609+05:30",
                "Id": 3,
                "CreatedAt": "2018-04-29T11:04:55.703609+05:30",
                "UpdatedAt": "2018-04-29T11:04:55.703609+05:30"
            }
        })
    }

    public static addPayment(req: Request, res: Response) {
        return res.send({
            "Test": {
                "Code": "568c3951-46b1-4e61-ab26-20b3224bf8f2",
                "Status": 20,
                "CurrentQuestion": 0,
                "StartTime": "2018-04-29T11:04:55.703",
                "Id": 3,
                "CreatedAt": "2018-04-29T11:04:55.703",
                "UpdatedAt": "2018-04-29T11:04:55.703"
            },
            "User": {
                "Name": "Gaurav",
                "Mobile": "8297236375",
                "Email": "gaurav9939@gmail.com",
                "Id": 1,
                "CreatedAt": "2018-04-05T22:14:47.17",
                "UpdatedAt": "2018-04-05T22:14:47.17"
            },
            "UserId": 1,
            "TestId": 3,
            "CreatedAt": "2018-04-29T11:04:56.12",
            "UpdatedAt": "2018-04-29T11:07:40.8033494+05:30",
            "PaymentReference": "6ea77d6d-9f57-4c47-9ae0-fd5332b97"
        });
    }

    public static getAllTest(req: Request, res: Response) {
        console.log("Yha aaya");
        return res.send(
            [
                {
                    "Test": {
                        "Code": "40a77d6d-9f57-4c47-9ae0-fd5332b97692",
                        "Status": 50,
                        "CurrentQuestion": 8,
                        "StartTime": "2018-04-07T01:53:10.577",
                        "Id": 2,
                        "CreatedAt": "2018-04-05T22:29:38.123",
                        "UpdatedAt": "2018-04-29T11:02:12.37"
                    },
                    "User": {
                        "Name": "Gaurav",
                        "Mobile": "8297236375",
                        "Email": "gaurav9939@gmail.com",
                        "Id": 1,
                        "CreatedAt": "2018-04-05T22:14:47.17",
                        "UpdatedAt": "2018-04-05T22:14:47.17"
                    },
                    "UserId": 1,
                    "TestId": 2,
                    "CreatedAt": "2018-04-05T22:29:38.153",
                    "UpdatedAt": "2018-04-05T22:47:00.587",
                    "PaymentReference": "6ea77d6d-9f57-4c47-9ae0-fd5332b97"
                },
                {
                    "Test": {
                        "Code": "568c3951-46b1-4e61-ab26-20b3224bf8f2",
                        "Status": 20,
                        "CurrentQuestion": 0,
                        "StartTime": "2018-04-29T11:04:55.703",
                        "Id": 3,
                        "CreatedAt": "2018-04-29T11:04:55.703",
                        "UpdatedAt": "2018-04-29T11:04:55.703"
                    },
                    "User": {
                        "Name": "Gaurav",
                        "Mobile": "8297236375",
                        "Email": "gaurav9939@gmail.com",
                        "Id": 1,
                        "CreatedAt": "2018-04-05T22:14:47.17",
                        "UpdatedAt": "2018-04-05T22:14:47.17"
                    },
                    "UserId": 1,
                    "TestId": 3,
                    "CreatedAt": "2018-04-29T11:04:56.12",
                    "UpdatedAt": "2018-04-29T11:07:40.803",
                    "PaymentReference": "6ea77d6d-9f57-4c47-9ae0-fd5332b97"
                }
            ]
            
        );
    }

    public static getTest(req: Request, res: Response) {
        return res.send(
            {
                "Test": {
                    "Code": "568c3951-46b1-4e61-ab26-20b3224bf8f2",
                    "Status": 20,
                    "CurrentQuestion": 0,
                    "StartTime": "2018-04-29T11:04:55.703",
                    "Id": 3,
                    "CreatedAt": "2018-04-29T11:04:55.703",
                    "UpdatedAt": "2018-04-29T11:04:55.703"
                },
                "User": {
                    "Name": "Gaurav",
                    "Mobile": "8297236375",
                    "Email": "gaurav9939@gmail.com",
                    "Id": 1,
                    "CreatedAt": "2018-04-05T22:14:47.17",
                    "UpdatedAt": "2018-04-05T22:14:47.17"
                },
                "UserId": 1,
                "TestId": 3,
                "CreatedAt": "2018-04-29T11:04:56.12",
                "UpdatedAt": "2018-04-29T11:07:40.803",
                "PaymentReference": "6ea77d6d-9f57-4c47-9ae0-fd5332b97"
            }            
        );
    }

    public static startTest(req: Request, res: Response) {
        return res.send(
            {
                "Minute": 0,
                "Second": 0,
                "State": 40,
                "Question": {
                    "Type": 0,
                    "Text": "What is the output",
                    "Code": "4 + 3",
                    "OptionA": "5",
                    "OptionB": "6",
                    "OptionC": "7",
                    "OptionD": "8",
                    "Answer": 2,
                    "Id": 1,
                    "CreatedAt": "2018-04-04T01:37:18.843",
                    "UpdatedAt": "2018-04-04T01:37:18.843"
                },
                "Score": 0,
                "Mobile": "8297236375",
                "TestCode": "568c3951-46b1-4e61-ab26-20b3224bf8f2"
            }
        );
    }

    public static submitTestAnswer(req: Request, res: Response) {
        return res.send(
            {
                "Minute": 1,
                "Second": 34,
                "State": 40,
                "Question": {
                    "Type": 0,
                    "Text": "What is the output",
                    "Code": "printf(\"%d\", 1+4)",
                    "OptionA": "5",
                    "OptionB": "6",
                    "OptionC": "7",
                    "OptionD": "8",
                    "Answer": 0,
                    "Id": 2,
                    "CreatedAt": "2018-04-05T21:52:42.397",
                    "UpdatedAt": "2018-04-05T21:52:42.397"
                },
                "Score": 0,
                "Mobile": "8297236375",
                "TestCode": "568c3951-46b1-4e61-ab26-20b3224bf8f2"
            }
        );
    }

    public static submitTestAnswer2(req: Request, res: Response) {
        return res.send(
            {
                "Minute": 5,
                "Second": 2,
                "State": 40,
                "Question": {
                    "Type": 10,
                    "Text": "What is the output",
                    "Code": "cout<< 9-2",
                    "OptionA": "5",
                    "OptionB": "6",
                    "OptionC": "7",
                    "OptionD": "8",
                    "Answer": 2,
                    "Id": 3,
                    "CreatedAt": "2018-04-05T21:53:20.11",
                    "UpdatedAt": "2018-04-05T21:53:20.11"
                },
                "Score": 0,
                "Mobile": "8297236375",
                "TestCode": "568c3951-46b1-4e61-ab26-20b3224bf8f2"
            }
            
        );
    }

    public static submitTestAnswerFinal(req: Request, res: Response) {
        return res.send(
            {
                "Minute": 7,
                "Second": 32,
                "State": 50,
                "Question": null,
                "Score": 9,
                "Mobile": "8297236375",
                "TestCode": "568c3951-46b1-4e61-ab26-20b3224bf8f2"
            }
        );
    }

}