export class QuestionDTO{
    public _id: string;
    public statement: string;
    public code: string;
    public optionA: string;
    public optionB: string;
    public optionC: string;
    public optionD: string;

    constructor(data) {
        if (data) {
        this._id = data._id;
        this.statement = data.statement;
        this.code = data.code;
        this.optionA = data.optionA;
        this.optionB = data.optionB;
        this.optionC = data.optionC;
        this.optionD = data.optionD;
        }
    }
}