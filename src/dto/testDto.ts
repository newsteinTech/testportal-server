import { QuestionDTO } from "./questionDTO";
import { TestStatus } from "../helpers/testStatus";
import { ModelHelper } from "../helpers/modelHelper";

export class TestDTO {
    public status: string;
    public questionIndex: number;
    public remianingTime: number; // In Second
    public question: QuestionDTO;

    constructor(test) {
        this.status = TestDTO.getStatus(test.status);
        this.questionIndex = test.currentQuestion + 1;
        this.remianingTime = ModelHelper.remainingTestTimeInSecond(test.startTime);
        this.question = new QuestionDTO(test.question);
    }

    private static getStatus(status: TestStatus): string {
        switch(status) {
            case TestStatus.CREATED:
                return "CREATED";
            case TestStatus.STARTED:
                return "STARTED";
            case TestStatus.COMPLETED:
                return "COMPLETED";
            case TestStatus.EXPIRED:
                return "EXPIRED";  
        }
    }
}