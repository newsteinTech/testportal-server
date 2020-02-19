export class ResponseModel {
    public isValid: boolean;
    public data: any;
    public errors: any;
    
    constructor(isValid: boolean, data: any, errors: any) {
        this.isValid = isValid;
        this.data = data;
        this.errors = errors;
    }

    public static getValidResponse(data: any) : ResponseModel{
        return new ResponseModel(true, data, null);
    }

    public static getInvalidResponse(errors: any): ResponseModel {
        return new ResponseModel(false, null, errors);
    }
}